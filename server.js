const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config();


const app = express();

const connection = mysql.createConnection({
    host: process.env.PUBLIC_IP,
    user: 'root',
    password: 'dummy',
    database: 'dummy'
});

connection.connect;

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/videos', function (req, res) {
    const { User, Title, ChannelTitle, TrendingDate, Tags, Region, isFavorite } = req.query;
    var is_where = false;
    if (Title || ChannelTitle || TrendingDate || Tags) is_where = true;
    var sql = `SELECT * FROM CHANNEL NATURAL JOIN VIDEO NATURAL JOIN TRENDING WHERE ${Title ? 'Title LIKE "%' + Title + '%" AND ' : 'Title LIKE "%%" AND'}  ${ChannelTitle ? 'ChannelTitle LIKE "%' + ChannelTitle + '%" AND ' : 'ChannelTitle LIKE "%%" AND'}  ${TrendingDate ? 'TrendingDate LIKE "%' + TrendingDate + '%" AND ' : 'TrendingDate LIKE "%%" AND'} ${Tags ? 'Tags LIKE "%' + Tags + '%"' : 'Tags LIKE "%%"'} LIMIT 20;`;
    console.log(sql);
    if (is_where == false) sql = `SELECT * FROM CHANNEL NATURAL JOIN VIDEO NATURAL JOIN TRENDING LIMIT 20;`;

    connection.query(sql, function (err, result) {
        console.log("Making videos select query...");
        if (err) {
            console.log("Query failed!");
            res.json(err)
            return;
        }
        console.log("Query Successful!");
        res.json(result);
    });
    
    if (User) {
        var query_time = new Date().toLocaleString();
        var concat = '';
        if (Title) concat = concat + Title;
        if (ChannelTitle) concat = concat + ChannelTitle;
        if (Tags) concat = concat + Tags;
        if (Region) concat = concat + Region;
        if (TrendingDate) concat = concat + TrendingDate.toLocaleString();
        var query_id = crypto.createHash('sha1').update(concat).digest('hex');
        console.log(query_id)
        var check_fav = `SELECT COUNT(*) as cnt FROM FAVORITES WHERE QueryID = '${query_id}' AND Username = '${User.UserName}';`;
        var count_fav = 0;
        connection.query(check_fav, function (err, result) {
            console.log("Checking if fav query id exists...");
            if (err) {
                console.log("Query failed!");
                // res.json(err)
                return;
            }
            console.log("Query Successful!");
            console.log(result);
            count_fav = result[0]['cnt'];
            // res.json(result);
        });
        setTimeout(() => {
            if (isFavorite && count_fav == 0) {
                var fav = `INSERT INTO FAVORITES VALUES ('${query_id}', '${User.UserName}');`;
                connection.query(fav, function (err, result) {
                    console.log("Fav query...");
                    if (err) {
                        console.log("Query failed!");
                        // res.json(err)
                        return;
                    }
                    console.log("Query Successful!");
                });
            } else {
                var del_fav = `DELETE FROM FAVORITES WHERE QueryID = '${query_id}' AND Username = '${User.UserName}';`;
                connection.query(del_fav, function (err, result) {
                    console.log("Delete Fav query...");
                    if (err) {
                        console.log("Query failed!");
                        // res.json(err)
                        return;
                    }
                    console.log("Query Successful!");
                });
            }
        }, 5000);

        var check_exists = `SELECT COUNT(*) as cnt FROM QUERY WHERE QueryID = '${query_id}';`;
        var count = 0;
        connection.query(check_exists, function (err, result) {
            console.log("Checking if query id exists...");
            if (err) {
                console.log("Query failed!");
                // res.json(err)
                return;
            }
            console.log("Query Successful!");
            console.log(result);
            count = result[0]['cnt'];
            // res.json(result);
        });

        setTimeout(() => {
            if (count >= 1) {
                // update query time in history
                var count_2 = 0
                var check_exists_hist = `SELECT COUNT(*) as cnt FROM HISTORY WHERE QueryID = '${query_id}' AND Username = '${User.UserName}';`;
                connection.query(check_exists_hist, function (err, result) {
                    console.log("Checking if query id exists in History...");
                    if (err) {
                        console.log("Query failed!");
                        // res.json(err)
                        return;
                    }
                    console.log("Query Successful!");
                    console.log(result);
                    count_2 = result[0]['cnt'];
                    // res.json(result);
                });
                setTimeout(() => {
                    if (count_2 >= 1) {
                        var update_time = `UPDATE HISTORY SET QueryTime = '${query_time}' WHERE QueryID = '${query_id}' AND Username = '${User.UserName}';`;
                        connection.query(update_time, function (err, result) {
                            console.log("Updating Query Time...");
                            if (err) {
                                console.log("Query failed!");
                                // res.json(err)
                                return;
                            }
                            console.log("Query Successful!");
                            // res.json(result);
                        });
                    } else {
                        var insert_hist = `INSERT INTO HISTORY VALUES('${User.UserName}', '${query_id}', '${query_time}');`;
                        connection.query(insert_hist, function (err, result) {
                            console.log("Inserting into hist...");
                            if (err) {
                                console.log("Query failed!");
                                // res.json(err)
                                return;
                            }
                            console.log("Query Successful!");
                            // res.json(result);
                        });
                    }
                }, 5000);

            } else {
                var activate_user = `INSERT INTO ACTIVE VALUES ('${query_id}', '${User.UserName}', '${query_time}');`;
                connection.query(activate_user, function (err, result) {
                    console.log("Activating User...");
                    if (err) {
                        console.log("Query failed!");
                        // res.json(err)
                        return;
                    }
                    console.log("Query Successful!");
                    // res.json(result);
                });
                var sql_query_insert = `INSERT INTO QUERY VALUES ('${query_id}', '${Title}', '${ChannelTitle}', '${TrendingDate}', '${Region}', '${Tags}');`;
                // trigger
                connection.query(sql_query_insert, function (err, result) {
                    console.log("Inserting Query Record...");
                    if (err) {
                        console.log("Query failed!");
                        // res.json(err)
                        return;
                    }
                    console.log("Query Successful!");
                    // res.json(result);
                });

                var deactivate_user = `DELETE FROM ACTIVE WHERE QueryID = '${query_id}' and Username = '${User.UserName}';`;
                setTimeout(() => {
                    // Execute the query
                    connection.query(deactivate_user, function (err, result) {
                        console.log("Deactivating User...");
                        if (err) {
                            console.log("Query failed!");
                            // res.json(err)
                            return;
                        }
                        console.log("Query Successful!");
                        // res.json(result);
                    });
                }, 5000);
            }
        }, 5000);
    }
});

app.get('/query-history', function (req, res) {
    const { UserName, isFavorite } = req.query;
    if (isFavorite === "true") {
        var sql = `SELECT * FROM FAVORITES NATURAL JOIN QUERY WHERE UserName = '${UserName}' ;`;
    } else {
        var sql = `SELECT * FROM HISTORY NATURAL JOIN QUERY WHERE UserName = '${UserName}'`;
    }
    console.log(`Making query-${isFavorite === "true" ? "favorite" : "history"} select query...`);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log("Query failed!");
            res.json(err)
            return;
        }
        console.log("Query Successful!");
        console.log(result);
        res.json(result);
    });

});


app.post('/updateuser', function (req, res) {
    const username = req.body.UserName;
    const email = req.body.Email;
    const password = req.body.Password;
    const phonenumber = req.body.PhoneNumber ? req.body.PhoneNumber : "";
    const firstname = req.body.FirstName ? req.body.FirstName : "";
    const lastname = req.body.LastName ? req.body.LastName : "";
    const sql = `UPDATE USER SET Password = '${password}', PhoneNumber = '${phonenumber}', FirstName = '${firstname}', LastName = '${lastname}' WHERE Email = '${email}';`;
    console.log("Making user update query...");
    connection.query(sql, function (err, result) {
        if (err) {
            console.log("Query failed!");
            res.json(err)
        }
        console.log("Query Successful!");
        res.json(result);
    });
});

app.post('/deleteuser', function (req, res) {
    const email = req.body.Email;
    const sql = `DELETE FROM USER WHERE Email = '${email}';`;
    console.log("Making user delete query...");

    connection.query(sql, function (err, result) {
        if (err) {
            console.log("Query failed!");
            res.json(err)
        }
        console.log("Query Successful!");
        res.json(result);
    });
});

// app.get('/advancedunion', function (req, res) {
//     const sql = 'select VideoID, ViewCount, TrendingDate, ChannelTitle from VIDEO v natural join CHANNEL c left join TRENDING t using (VideoID) where v.Tags like "%comedy%" Union select VideoID, ViewCount, TrendingDate, ChannelTitle from VIDEO v natural join CHANNEL c left join TRENDING t using (VideoID) where v.Likes >= 500000 order by TrendingDate desc, ViewCount desc, ChannelTitle LIMIT 15;';
//     console.log("testing advanced query: union")
//     connection.query(sql, function (err, result) {
//         if (err) {
//             console.log("advanced union failed")
//             res.json(err)
//         }
//         console.log("advanced union successful");
//         res.json(result);
//     });

// });

// app.get('/advancedgroup', function (req, res) {
//     // group by requested column, see which ones have avg likes above 200k
//     // filter should get the column name, default is channel id
//     const filter = 'ChannelID';
//     const sql = 'select ChannelTitle, avg(Likes) as AvgLikes from VIDEO v natural join CHANNEL c group by ChannelID having count(ChannelTitle) >= 2 and avg(Likes) >= 200000 order by avg(Likes) desc, ChannelTitle LIMIT 15;';
//     console.log("testing advanced query: group")
//     connection.query(sql, function (err, result) {
//         if (err) {
//             console.log("advanced group failed")
//             res.json(err)
//         }
//         console.log("advanced group successful");
//         res.json(result);
//     });

// });

// app.get('/advancedunion', function (req, res) {
//     const tag = 'comedy';
//     const min_likes = 500000;
//     const sql = 'CALL get_advanced_union(?, ?);';
//     console.log("testing advanced query: union");

//     connection.query(sql, [tag, min_likes], function (err, result) {
//         if (err) {
//             console.log("advanced union failed");
//             res.json(err);
//         } else {
//             console.log("advanced union successful");
//             res.json(result[0]); // Stored procedure results are wrapped in an array, so we need to access the first element.
//         }
//     });
// });

app.get('/advancedunion', function (req, res) {
    const tag = req.query.tag || 'Music';
    const min_likes = parseInt(req.query.min_likes) || 500000;
    const sql = 'CALL get_advanced_union(?, ?);';
    console.log("testing advanced query: union");

    connection.query(sql, [tag, min_likes], function (err, result) {
        if (err) {
            console.log("advanced union failed");
            res.json(err);
        } else {
            console.log("advanced union successful");
            res.json(result[0]); // Stored procedure results are wrapped in an array, so we need to access the first element.
        }
    });
});

app.get('/advancedgroup', function (req, res) {
    // group by requested column, see which ones have avg likes above 200k
    // filter should get the column name, default is channel id
    const filter = 'ChannelID';
    const min_count = req.query.min_count || 2;
    const min_avg_likes = req.query.min_avg_likes || 200000;
    const sql = 'CALL get_advanced_group(?, ?, ?);';
    console.log("testing advanced query: group, filter: " + filter + ", min_count: " + min_count + ", min_avg_likes: " + min_avg_likes);

    connection.query(sql, [filter, min_count, min_avg_likes], function (err, result) {
        if (err) {
            console.log("advanced group failed");
            res.json(err);
        } else {
            console.log("advanced group successful");
            res.json(result[0]); // Stored procedure results are wrapped in an array, so we need to access the first element.
        }
    });
});
app.get('/top-trending-videos', async (req, res) => {
    let { region, date } = req.query;

    if (!region || !date) {
        return res.status(400).json({ error: 'Please provide a region and a date.' });
    }
    region = `%${region}%`;
    date = `%${date}%`;
    console.log("Getting top trending videos")
    connection.query('CALL GetTopTrendingVideos(?, ?)', [region, date], function (err, result) {
        if (err) {
            console.log("Top trending videos query failed");
            res.json(err);
        } else {
            console.log("Top trending videos query successful");
            res.json(result[0]); // Stored procedure results are wrapped in an array, so we need to access the first element.
        }
    });


});

app.get('/get-popular-videos', async (req, res) => {
    let { minViews, minLikes, region } = req.query;

    if (isNaN(minViews) || isNaN(minLikes) || !region) {
        return res.status(400).json({ message: 'Invalid parameters' });
    }
    // region = `%${region}%`;
    // date = `%${date}%`;
    console.log("Getting Popular videos")
    connection.query('CALL GetPopularVideos(?, ?, ?)', [minViews, minLikes, region], function (err, result) {
        if (err) {
            console.log("Top Popular query failed");
            res.json(err);
        } else {
            console.log("Top Popular query successful");
            res.json(result[0]); // Stored procedure results are wrapped in an array, so we need to access the first element.
        }
    });


});

app.get('/top-trending-tags', async (req, res) => {
    let topN = parseInt(req.query.topN);

    if (isNaN(topN)) {
        return res.status(400).json({ message: 'Invalid parameters' });
    }

    console.log("Getting Tags")
    connection.query('CALL GetTopTrendingTags(?)', [topN], function (err, result) {
        if (err) {
            console.log("Top Tags query failed");
            res.json(err);
        } else {
            console.log("Top Tags query successful");
            res.json(result[0]); // Stored procedure results are wrapped in an array, so we need to access the first element.
        }
    });


});

app.post('/register', function (req, res) {
    const username = req.body.UserName;
    var email = req.body.Email;
    var password = req.body.Password;
    const sql = `INSERT INTO USER (UserName, Email, Password) VALUES ('${username}','${email}', '${password}');`;
    console.log("Making insert query...");
    connection.query(sql, function (err, result) {
        if (err) {
            console.log("Query failed!");
            res.json(err)

        }
        console.log("Query successful!");
        res.json(result);
    });

});

app.post('/login', function (req, res) {
    const email = req.body.Email;
    const sql = `SELECT * FROM USER WHERE email = '${email}';`;
    console.log("Making USER select query...");
    connection.query(sql, function (err, result) {
        if (err) {
            console.log("Query failed!");
            res.json(err)
            return;
        }
        console.log("Query Successful!");
        res.json(result);
    });
});

// app.get('/success', function(req, res) {
//     res.send({'message': 'Attendance marked successfully!'});
// });

// this code is executed when a user clicks the form submit button
// app.post('/mark', function(req, res) {
// var netid = req.body.netid;
// });



app.listen(process.env.SERVER_PORT, function () {
    console.log(`Node app is running on port ${process.env.SERVER_PORT}`);
});


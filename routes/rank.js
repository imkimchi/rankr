/**
 * Created by Seungwoo on 2016. 2. 22..
 */

let cheerio = require('cheerio'),
    request = require('request');

exports.naver = function (req, response, next) {
    let url = 'http://www.naver.com';

    let rankData = {
        title: String,
        rank: Number,
        status: String,
        url: String
    };

    let rankResult = {
        result: {type: Number, default: 0},
        time:  Math.floor(Date.now() / 1000),
        type: "naver",
        data: [rankData]
    };

    request(url, function (err, res, html) {
        if (!err) {
            let $ = cheerio.load(html);
            rankResult.result = 1;
            $('ol#realrank a').each(function (i, elem) {

                var data = $(this);

                if(i<10){
                    rankResult.data[i] = {
                        title: data.attr('title'),
                        rank : i+1,
                        status : data.first().find('.tx').text(),
                        url : data.attr('href')
                    };
                }

            });

            response.setHeader('Content-Type', 'application/json');
            response.send(rankResult);

        } else {
            throw err;
        }
    })
};

exports.daum = function (req, response, next) {
    let url = 'http://www.daum.net';

    let rankData = {
        title: String,
        rank: Number,
        status: String,
        url: String
    };

    let rankResult = {
        result: {type: Number, default: 0},
        time:  Math.floor(Date.now() / 1000),
        type : "daum",
        data: [rankData]
    };

    request(url, function (err, res, html) {
        if (!err) {
            let $ = cheerio.load(html);
            rankResult.result = 1;
            $('ol#realTimeSearchWord > li > div.roll_txt > div:not(.rank_dummy)').each(function (i, elem) {

                let data = $(this);

                if(i<10){
                    rankResult.data[i] = {
                        title: realEscape(data.find("span.txt_issue > a").text()),
                        rank : i+1,
                        status : data.find("span.screen_out").text(),
                        url : data.find("span.txt_issue > a").attr('href')
                    };
                }

            });

            response.setHeader('Content-Type', 'application/json');
            response.send(rankResult);

        } else {
            throw err;
        }
    })
};

let realEscape = function (target) {
    return target.replace(/\n/gi,'');
};

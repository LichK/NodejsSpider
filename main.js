var config = require('config/config').config,
    spiderUtil = require('util/spiderUtil'),
    $ = require('jQuery'),
    dbUtil = require('util/dbUtil'),
    common = require('common/common');

function _getEntitis(pageIndex) {
    var url = config.urlPattern + pageIndex;

    spiderUtil.get(url, {
        onSuccess: function(body) {
            var $pDivs = $(body).find(config.selector.jobDiv);

            $pDivs.each(function(i, e) {
                var $e = $(e),

                    name = $e.find(config.selector.jobName).text(),
                    salaries = $e.find(config.selector.jobSalary).text().replace(/\s/g, ''),

                    numReg = /\d+/g,
                    matchers = salaries.match(numReg),
                    salary = 0,

                    regs = common.getRegs(),
                    job = '';

                try {
                    if (matchers && matchers.length === 2) {
                        salary = (parseInt(matchers[0]) + parseInt(matchers[1])) / 2.0;
                    } else {
                        salary = parseInt(matchers[0]);
                    }



                    if (regs.javaReg.test(name)) {
                        job = 'java';
                    }  else if (regs.jsReg.test(name)) {
                        job = 'javascript';
                    } else if (regs.cPlusPlusReg.test(name)) {
                        job = 'c++';
                    } else if (regs.cReg.test(name)) {
                        job = 'c';
                    } else if (regs.phpReg.test(name)) {
                        job = 'php';
                    } else if (regs.pythonReg.test(name)) {
                        job = 'python';
                    } else if (regs.rubyReg.test(name)) {
                        job = 'ruby';
                    } else if (regs.dbaReg.test(name)) {
                        job = 'dba';
                    } else if (regs.iosReg.test(name)) {
                        job = 'ios';
                    } else if (regs.androidReg.test(name)) {
                        job = 'android';
                    } else if (regs.gameReg.test(name)) {
                        job = 'game';
                    } else if (regs.flashReg.test(name)) {
                        job = 'flash';
                    } else if (regs.doNetReg.test(name)) {
                        job = '.net';
                    } else {
                        job = 'unkown';
                    }

                    var sql = "" +
                        "INSERT INTO job_salary ( " +
                            "pageIndex, "+
                            "listIndex, " +
                            "job, " +
                            "salary, " +
                            " memo " +
                        ") VALUES ( " +
                            pageIndex + ", " +
                            i + ", " +
                            "'" + job + "', " +
                            salary + ", " +
                            "'job: " + name + "; salaries: " + salaries + "'" +
                        ")";

                    dbUtil.doQuery(sql, function(error, rows) {
                        if (error) {
                            console.log("SQL: " + sql);

                            throw error;
                        } else {
                            console.log('{ job: ' + name + '; salaries: ' + salaries + ' } 创建成功');
                        }
                    });

                } catch(err) {
                    console.log(err + ": " + "'job: " + name + "; salaries: " + salaries + "'");
                }
            });
        },
        onError: function(resp) {
            console.log('ERROR! ' + url + ' got error, error message: ' + resp);
        }
    });
}

for (var i = config.firstPage; i <= config.lastPage; i++) {
    _getEntitis(i);
    // process.exit();
}
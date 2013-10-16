var config = require('../config/regConfig'),
    spiderUtil = require('../util/spiderUtil'),
    $ = require('jQuery'),
    dbUtil = require('../util/dbUtil');

function _getEntitis(pageIndex) {
    var url = config.config.urlPattern + pageIndex;

    spiderUtil.get(url, {
        onSuccess: function(body) {
            var $pDivs = $(body).find(config.selector.jobDiv),
                objs = [];

            $pDivs.each(function(i, e) {
                var $e = $(e),

                    name = $e.find(config.selector.jobName).text(),
                    salaries = $e.find(config.selector.jobSalary).text(),

                    numReg = /\d+/g,
                    matchers = salaries.match(numReg),
                    salary = 0,

                    regs = config.getRegs(),
                    job = '';

                if (matchers.length === 2) {
                    salary = (parseInt(matchers[0]) + parseInt(matchers[1])) / 2.0;
                } else {
                    salary = parseInt(matchers[0]);
                }

                if (regs.jsReg.test(name)) {
                    job = 'javascript';
                } else if (regs.cPlusPlusReg.test(name)) {
                    job = 'c++';
                } else if (regs.cReg.test(name)) {
                    job = 'c';
                } else if (regs.javaReg.test(name)) {
                    job = 'java';
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
                } else {
                    job = 'unkown';
                    console.log(name + ' can not be parsed!');
                }

                objs.push({
                    page: pageIndex,
                    index: i,
                    job: job,
                    salary: salary,
                    memo: 'name: ' + name + '; salaries: ' + salaries
                });
            });
        },
        onError: function(resp) {
            console.log('ERROR! ' + url + ' got error, error message: ' + resp.toString());
        }
    });
}

for(var i = config.firstPage; i <= config.lastPage; i++) {
    _getEntitis(i);
}
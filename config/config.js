_config = {
    urlPattern: 'http://www.oschina.net/job?q=&addr_city=&addr_prv=&type=0&rank=0&salary=&p=',

    firstPage: 1,
    lastPage: 246,

    selector: {
        jobDiv: '.FilterPosition',
        jobName: '.CoPart1 a',
        jobSalary: '.PoWrapper:eq(0)'
    }
};

exports.config = _config;

exports.getRegs = function() {
    return {
        jsReg: /前端|javascript|js/gi,
        cPlusPlusReg: /c\+\+/gi,
        cReg: /c[^\+]./gi,
        javaReg: /java/gi,
        phpReg: /php/gi,
        pythonReg: /python/gi,
        rubyReg: /ruby/gi,
        dbaReg: /dba|sql/gi,
        iosReg: /ios|苹果/gi,
        androidReg: /android|安卓/gi,
        gameReg: /游戏|game/gi
    };
};
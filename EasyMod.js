/* This is EasyMod.js
   By BonesYT (start: 19:48 03/01/2022 DD/MM/YYYY)
              (release: 11:58 04/01/2022 DD/MM/YYYY)
              (update: 14:50 02/02/2022 DD/MM/YYYY) <-- edit this as well when modding
   Last modded by: (no one)
   EasyMod.js basically adds functions to strings, numbers, etc.
   Please don't copy! 
   
   NOTE: if you're modding/forking this, just remember, change everything necessary in EasyObj.info!
   Also, if there's a new function/type, please add it to EasyObj.info.a.changed array!
   
   */

// EasyMod's Object

var config = {
    keycompress: false, // Set this to true if you want to use less memory (might lag more)
    isNode: false, // Activate this if you're using node.js (can avoid errors but will remove document stuff)
    allowsetint: true // Turn this off to disallow setInterval on startup.
}

var EasyObj = {
    info: {
        version: '9',
        createdBy: "BonesYT", // Author
        modders: [ // All people that modified/forked this
            "BinaryCrown"
        ],
        lastBy: "BonesYT", // Last edited by
        a: { // All adds
            proto: {}, // Added prototype functions lists (starts empty)
            static: {}, // Added static values lists (starts empty)
            changed: ['Number','Boolean','String','BigInt','Function','Array','Object','Date','ImageData','Math'],
            totalAdds: undefined, // Total proto/static adds (starts undefined)
            newfuncts: undefined // All new functions
        },
        from: 'https://github.com/BonesYT/EasyMod.js',
        issues: 'https://github.com/BonesYT/EasyMod.js/issues',
        isMin: false, // Change this to true only in EasyMod.min.js
        lines: 2960 // Ammount of lines this original file has
    },
    define: (n, v)=>{
        this[n] = v
    },
    undefine: (n)=>{
        delete this[n]
    },
    isDefined: (n)=>{
        return this[n] !== undefined
    },
    get: (n)=>{
        return this[n]
    },
    createMethod: (target, name, func)=>{ //f(Number, 'test', ()=>{//code here})
        var a = target
        if (typeof a != 'function') a = this[target]
        a.prototype[name] = func
    },
    isConst(varname) { //
        var zzzz
        try {
            eval(varname.toString())
            try {
                eval(`zzzz = ${varname}`)
                eval(`${varname} = 'Replaced'`)
                eval(`${varname} = zzzz`)
                return false
            } catch {
                return true
            }
        } catch {
            throw ReferenceError('[EasyMod.js] 0: ' + varname + ' is not defined')
        }
    },
    protoOf: (type)=>{
        this[type].prototype
    },
    waitUntil(u=()=>{}, f=()=>{}, delay=10) { //wait until u returns true then run f.
        var a = 0, i,
            b = ()=>{
                if (u(a)) {
                    f(a)
                    clearInterval(i)
                }
                a++
            },
        i = setInterval(b, delay) 
    },
    repeatUntil(u=()=>{}, f=()=>{}, end=()=>{}, delay=10) { // repeat executing f until u returns true then run end.
        var a = 0
        while (!u(a)) {
            f(a)
        }
        end()
    },
    key: {
        id: {code: {}, key: {}, num: {}, any: false}, // key press
        press: key => {
            if (key == 'any' | key == -1) return EasyObj.key.id.any
            return EasyObj.key.id.code[key] | EasyObj.key.id.key[key] | EasyObj.key.id.num[key]
        },
        compressed: config.keycompress
    },
    mouse: {
        ldown: false, // left button down?
        mdown: false, // middle button down?
        rdown: false, // right button down?
        down: false, // any button down?
        sdown: false, // any side button down?
        scr: 0, // scroll speed per tick
        scrs: 0 // same as scroll but sign'd
    },
    addEL(type, func, ...options) {
        var a = [type, func]
        a.push.apply(a, options)
        document.addEventListener.apply(document, a)
    },
    setDef(...inputs) {
        return inputs.reduce((p,c)=>{
            return p == undefined ? c : p
        }, undefined)
    },
    stc: {
        abseq: (x, y)=>{
            if (typeof x == typeof y) {
                switch (typeof x) {
                    case 'number':
                        return x == y
                    break; case 'string':
                        return x == y
                    break; case 'boolean':
                        return x == y
                    break; case 'bigint':
                        return x == y
                    break; case 'undefined':
                        return true
                    break; case 'object':
                        return x.stringify() == y.stringify()
                    break; case 'function':
                        return x.toString() == y.toString()
                    break; case 'symbol':
                        return x.toString() == y.toString()
                    break
                }
            } else {
                return false
            }
        },
        gt(x, y) {
            return typeof x == typeof y ? x > y : false
        },
        gte(x, y) {
            return typeof x == typeof y ? x >= y : false
        },
        lt(x, y) {
            return typeof x == typeof y ? x < y : false
        },
        lte(x, y) {
            return typeof x == typeof y ? x <= y : false
        },
    },
    doc: {
        msePos: {x: 0, y: 0},
        lmsePos: {x: 0, y: 0},
        buttonClick(node, f=()=>{}) {
            if (node.localName != 'button') throw TypeError('[EasyMod.js] Element tag is not button')
            if (!(typeof f == 'function')) throw TypeError('[EasyMod.js] onclick needs to be an function')
            node.addEventListener('click', f)
        },
        setGetElementById(name='$') {
            this[name] = function (e) {
                return document.getElementById(e)
            }
        },
        canv: {
            canvasMsePos(node, objTarget) {
                if (node.localName != 'canvas') throw TypeError('[EasyMod.js] Element tag is not canvas')
                if (!typeof objTarget == 'object') throw TypeError('[EasyMod.js] Target needs to be an object')
                objTarget.mouse = {m:{x:0,y:0},l:{x:0,y:0}}
                node.addEventListener('mousemove', e=>{
                    objTarget.mouse.m.x = e.offsetX,
                    objTarget.mouse.m.y = e.offsetY
                })
                node.addEventListener('mousedown', e=>{
                    objTarget.mouse.l.x = e.offsetX,
                    objTarget.mouse.l.y = e.offsetY
                })
            },
            progbar(node, progress=0, x=4, y=4, width=128, height=32, outwidth=4, fullstyle='#ffffff', emptystyle='#999999', outstyle='#444444', dir=0) {
                if (node.localName != 'canvas') throw TypeError('[EasyMod.js] Element tag is not canvas')
                var ctx = node.getContext('2d')
                ctx.fillStyle = outstyle
                ctx.fillRect(x-outwidth, y-outwidth, width+outwidth*2, height+outwidth*2)
                ctx.fillStyle = emptystyle
                ctx.fillRect(x, y, width, height)
                ctx.fillStyle = fullstyle
                switch (dir) {
                    case 0:
                        ctx.fillRect(x, y, width*progress, height)
                    break; case 1:
                        ctx.fillRect(x, y, width, height*progress)
                    break; case 2:
                        ctx.fillRect(x+width*(1-progress), y, width*progress, height)
                    break; case 3:
                        ctx.fillRect(x, y+height*(1-progress), width, height*progress)
                    break
                }
            },
            rect(node, x=0, y=0, w=128, h=128, style='#000000', outwidth=0, outstyle='#222222') {
                if (node.localName != 'canvas') throw TypeError('[EasyMod.js] Element tag is not canvas')
                var ctx = node.getContext('2d');

                ctx.fillStyle = style
                ctx.strokeStyle = outstyle
                ctx.lineWidth = outwidth

                ctx.fillRect(x, y, w, h)
                if (outwidth) ctx.strokeRect(x, y, w, h)
            },
            circle(node, x=0, y=0, r=16, style='#000000', outwidth=0, outstyle='#222222') {
                if (node.localName != 'canvas') throw TypeError('[EasyMod.js] Element tag is not canvas')
                var ctx = node.getContext('2d');

                ctx.fillStyle = style
                ctx.strokeStyle = outstyle
                ctx.lineWidth = outwidth

                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fill();
                if (outwidth) ctx.stroke()
                ctx.closePath()
            }
        },
        effect(name, value=1, target=document.querySelector('html')) {
            target.style.filter = `${name}(${value})`
        },
        setinner(target, innerHTML) {
            if (!(typeof target == 'object' & target.toString().includes('HTML'))) throw TypeError('[EasyMod.js] Target has to be an HTML element')
            target.innerHTML = innerHTML
        },
        reload() {
            document.location.reload()
        },
        getCSS() { // gets all loaded CSS files
            var a = document.querySelectorAll('html>head>link[rel="stylesheet"]'), b = []
            a.forEach(v => {
                b.push(v.href)
            })
            return b
        },
        getJS() { // gets all loaded JS files
            var a = document.querySelectorAll('html>head>script[src]'), b = []
            a.forEach(v => {
                b.push(v.src)
            })
            return b
        },
        readfile(node) {
            var a = node.files[0], b, c
            c=a.text()
            c.then(v=>b=v)
            return b
        },
        zoom(val) {
            document.querySelector('html').style.zoom = val
        }
    },
    eval(code, isReturn = true) {
        return new Function('thisObj', (isReturn ? 'return ' : '') + code)(this)
    },
    playaudio(src, volume=1, speed=1, onload=()=>{}) {
        var a = new Audio(src)
        a.volume = volume
        a.playbackRate = speed
        a.onload = onload
        a.play()
    },
    set: {
        var(name, value, This) {
            This[name] = value
        },
        const(name, value, This) {
            Object.defineProperty(This, name, {
                value: value,
                writable: false,
                enumerable: true,
                configurable: true
            });
        }
    },
    time: 0, // milliseconds since page got open
    toReadme: {
        part(id) {
            return `# ${id}\n${EasyObj.info.a.proto[id].length==0?'':'* '+EasyObj.info.a.proto[id].sort().join(', ')+'\n'}${EasyObj.info.a.static[id].length==0?'':'* static: '+EasyObj.info.a.static[id].sort().join(', ')+'\n'}`
        },
        full() {
            var a = '# Extra Methods and statics\n',
                b = EasyObj.toReadme.part
            EasyObj.info.a.proto.forEach((v,i)=>{
                a += b(i)
            })
            a += '\n' + EasyObj.toReadme.easyobj()
            return a
        },
        easyobj() {
            return `# EasyObj\n* EasyObj is an object with abilities.\n* ${Object.keys(EasyObj).join(', ')}`
        },
        absfull() { // Use this if you want to update the README.md file faster/easier while forking.
            return `# EasyMod.js
EasyMod.js by BonesYT, a library that adds a variety methods into JS!

This adds a lot of methods to: strings, numbers, booleans, bigint, functions, arrays, objects and date!

Version: VU${EasyObj.info.version}
VU = Version Update

Helpers/credits (2 users): ${[EasyObj.info.createdBy].concat(EasyObj.info.modders).join(', ')}

${EasyObj.toReadme.full()}`
        }
    },
    clipb() {
        try {
            navigator.clipboard.read().then(async v=>{
                try {
                    await v[0].getType('text/plain').then(v=>{
                        v.text().then(v=>EasyObj.clipb.info=v)
                    })
                } catch {
                    EasyObj.clipb.info = null
                    return false
                }
            })
            return true
        } catch {
            return false
        }
    },
    type(type, ...values) {
        switch (type) {
            case 'number': return Number(values[0])
            case 'boolean': return Boolean(values[0])
            case 'string': return String(values[0])
            case 'bigint': return BigInt(values[0])
            case 'object': return Object(values[0])
            case 'symbol': return Symbol(values[0])
            case 'function': return Function.apply(null, values)
            case 'array': return Array.apply(null, values)
            case 'undefined': return undefined
        }
    },
    errors: ['Error','RangeError','ReferenceError','SyntaxErrror','TypeError','URIError','EvalError'],
    prt: {
        s: ['{', '[', '(', '"', "'", '`'],
        e: ['}', ']', ')', '"', "'", '`']
    },
    random: undefined,
    isNode: config.isNode,
    setint: config.allowsetint,
    dc: { // Def: Document Configuration
        title: undefined,
        icon: undefined,
        setTitle(title) {
            document.querySelector('html>head>title').innerHTML = title
            EasyObj.dc.title = title.toString()
        },
        setIcon(href) {
            document.querySelector('html>head>link[rel="shortcut icon"]').href = href
            EasyObj.dc.icon = href.toString()
        }
    },
    fractal(start=0, nextCond=(value,iter)=>{}, nextIter=(value,iter)=>{}, maxIter=Infinity, isArray=false) {
        var a = start, b = [a]
        for (var i = 0; !nextCond(a, i) & i < maxIter; i++) {
            a = nextIter(a, i)
            if (isArray) b.push(a)
        }
        return isArray ? b : a
    },
    scrLine() {
        return Number(Error('test error').stack.substr(81).until(0, ':', 1))
    },
    repeat(amm, funct=(iter, array)=>{}, end=(iter, array)=>{}) {
        var a = []
        for (var i = 0; i < amm; i++) {
            a.push(funct(i, a))
        }
        end(i, a)
        return a
    },
    switch(input, cases=[], functs=[]) {
        if (cases.length != functs.length) throw Error('[EasyMod.js] both cases and functs arrays has to have the same length')
        var a = -1, b
        cases=cases.map(v => {
            if (!v.isArray) return [v]
        })
        cases.forEach((v,i) => {
            if (v.includes(input) & a == -1) a = i
        })
        if (a != -1) return functs[a](a, input)
    },
    saveWarn: false,
}

delete config // not really necessary lol

// Method creating function (needed so all the variables in here are local)
;(function(){

    var add = EasyObj.info.a

    // Send new methods to types/functions
    function AddObj(target, proto={}, static={}, name) {
        EasyObj.info.a.proto[name] = Object.keys(proto)
        EasyObj.info.a.static[name] = Object.keys(static)
        if (target.prototype) Object.assign(target.prototype, proto)
        Object.assign(target, static)
    }

    // Start the prototype and static list in EasyObj.info.a
    add.changed.forEach(v => {
        add.proto[v] = []
        add.static[v] = []
    })
    
    
    // NUMBERS
    
    var P = {} // Prototype object
    var S = {} // Static Object
    
    P.add = function (i) {
        return this + i
    }
    P.sub = function (i) {
        return this - i
    }
    P.inc = function () {
        return this + 1
    }
    P.dec = function () {
        return this - 1
    }
    P.mul = function (i) {
        return this * i
    }
    P.div = function (i) {
        return this / i
    }
    P.pow = function (i) {
        return this ** i
    }
    P.and = function (i) {
        return this & i
    }
    P.or = function (i) {
        return this | i
    }
    P.xor = function (i) {
        return this ^ i
    }
    P.mod = function (i) {
        return this % i
    }
    P.inv = function (i=1) {
        return i / this
    }
    P.doub = function () {
        return this * 2
    }
    P.half = function () {
        return this / 2
    }
    P.trip = function () {
        return this * 3
    }
    P.thir = function () {
        return this / 3
    }
    P.sqr = function () {
        return this ** 2
    }
    P.sqrt = function () {
        return this ** 0.5
    }
    P.cb = function () {
        return this ** 3
    }
    P.cbrt = function () {
        return this ** (1 / 3)
    }
    P.bas = function (i) {
        return i ** this
    }
    P.nrot = function (i) {
        return this ** (1 / i)
    }
    P.nrotr = function (i) {
        return i ** (1 / this)
    }
    P.neg = function (i=0) {
        return i - this
    }
    P.log = function () {
        return Math.log(this)
    }
    P.log10 = function () {
        return Math.log10(this)
    }
    P.log2 = function () {
        return Math.log2(this)
    }
    P.logb = function (i) {
        return Math.log(this) / Math.log(i)
    }
    P.logbr = function (i) {
        return Math.log(i) / Math.log(this)
    }
    P.floor = function (i=1) {
        return Math.floor(this/i)*i
    }
    P.round = function (i=1) {
        return Math.round(this/i)*i
    }
    P.ceil = function (i=1) {
        return Math.ceil(this/i)*i
    }
    P.random = function (i=0) {
        return Math.random() * (this - i) + i
    }
    P.randomn = function () {
        return this.random(-this)
    }
    P.clz32 = function () {
        return Math.clz32(this)
    }
    P.max = function (...i) {
        i.unshift(this)
        return Math.max.apply(null, i)
    }
    P.min = function (...i) {
        i.unshift(this)
        return Math.min.apply(null, i)
    }
    P.sin = function (isDeg = false) {
        return Math.sin(this / (isDeg ? Math.degrad : 1))
    }
    P.cos = function (isDeg = false) {
        return Math.cos(this / (isDeg ? Math.degrad : 1))
    }
    P.tan = function (isDeg = false) {
        return Math.tan(this / (isDeg ? Math.degrad : 1))
    }
    P.asin = function () {
        return Math.asin(this)
    }
    P.acos = function () {
        return Math.acos(this)
    }
    P.atan = function () {
        return Math.atan(this)
    }
    P.atan2 = function () {
        return Math.atan2(this)
    }
    P.sinh = function () {
        return Math.sinh(this)
    }
    P.cosh = function () {
        return Math.cosh(this)
    }
    P.tanh = function () {
        return Math.tanh(this)
    }
    P.asinh = function () {
        return Math.asinh(this)
    }
    P.acosh = function () {
        return Math.acosh(this)
    }
    P.atanh = function () {
        return Math.atanh(this)
    }
    P.sign = function () {
        return Math.sign(this)
    }
    P.abs = function () {
        return Math.abs(this)
    }
    P.absn = function () {
        return Math.abs(this) * -1
    }
    P.trunc = function () {
        return Math.trunc(this)
    }
    P.log1p = function () {
        return Math.log1p(this)
    }
    P.fround = function () {
        return Math.fround(this)
    }
    P.hypot = function (...i) {
        i.unshift(this)
        return Math.hypot.apply(null, i)
    }
    P.imul = function (i) {
        return Math.imul(this, i)
    }
    P.gt = function (i) {
        return this > i
    }
    P.gte = function (i) {
        return this >= i
    }
    P.lt = function (i) {
        return this < i
    }
    P.lte = function (i) {
        return this <= i
    }
    P.comp = function (i=0) {
        return (this-i).sign()
    }
    P.isNaN = function () {
        return isNaN(this)
    }
    P.bool = function () {
        return Boolean(this)
    }
    P.floatFix = function (i=12) { // fixes precision
        return Math.round(this * 10 ** i) / 10 ** i
    }
    P.lfloor = function (i=10) { // Def: l means logarithm
        return this.logb(i).floatFix().floor().bas(i)
    }
    P.lround = function (i=10) {
        return this.logb(i).floatFix().round().bas(i)
    }
    P.lceil = function (i=10) {
        return this.logb(i).floatFix().ceil().bas(i)
    }
    P.isInf = function () {
        return this == Infinity | this == -Infinity
    }
    P.isFin = function () {
        return this != Infinity
    }
    P.isz = function () {
        return this == 0
    }
    P.isPos = function (e) {
        return e ? this >= 0 : this > 0
    }
    P.isNeg = function (e) {
        return e ? this <= 0 : this < 0
    }
    P.isalt = function (i=1) { // Def: is absolute less than x?
        return this.abs().lt(i)
    }
    P.dti = function (i) { // Def: decimal to integer
        var dec = this % 1
        while (dec % 1 > (i || 0.00001)) {
            dec *= 10
        }
        return dec
    }
    P.dtil = function () {
        return this.dti().log10().floor().add(1)
    }
    P.join = function (i) {
        if (this % 1 != 0 & i % 1 != 0) {
            i = i.dti().add(i.floor().mul(10**i.dtil()))
        }
        return String(this) + String(i)
    }
    P.low = function (e=0) {
        var a = this.floor()
        var b = a % 1
        while (!(Math.floor(a % 10) != 0 | a < 10)) {
            a /= 10
        }
        return a + (e ? b : 0)
    }
    P.infs = function () { // Def: Infinities
        return Math.log10(this)/Math.log10(Number.MAX_VALUE)
    }
    P.toDate = function () {
        return new Date(this)
    }
    P.toTimeStr = function (hasMS = false) {
        var a = this % 1e3,
            b = Math.floor(this/1e3)%60,
            c = Math.floor(this/6e4)%60,
            d = Math.floor(this/3.6e6)%24,
            e = Math.floor(this/8.64e7)%365,
            f = Math.floor(this/3.1536e10),
            r = []
        a = a == 1 ? a + ' millisecond ': a + ' milliseconds'
        b = b == 1 ? b + ' second' : b + ' seconds'
        c = c == 1 ? c + ' minute' : c + ' minutes'
        d = d == 1 ? d + ' hour' : d + ' hours'
        e = e == 1 ? e + ' day' : e + ' days'
        f = f == 1 ? f + ' year' : f + ' years'
        if (hasMS) r.push(a)
        if (this >= 1e3 | !hasMS) r.push(b)
        if (this >= 6e4) r.push(c)
        if (this >= 3.6e6) r.push(d)
        if (this >= 8.64e7) r.push(e)
        if (this >= 3.1536e10) r.push(f)
        r[r.length-1] = r[r.length-1].trim()
        return r.join(', ')
    }
    P.toTimeStr2 = function (hasMS = false, hasDays = false) {
        if (isNaN(this)) return null
        var a = this % 1e3,
            b = Math.floor(this/1e3)%60,
            c = Math.floor(this/6e4)%60,
            d = Math.floor(this/3.6e6)%(hasDays?24:Infinity),
            e = Math.floor(this/8.64e7)%365,
            f = Math.floor(this/3.1536e10)
        var r = ''
        if (hasMS) r += '.' + a.toString().padStart(3, '0')
        r = ':' + b.toString().padStart(2, '0') + r
        r = ':' + c.toString().padStart(2, '0') + r
        r = (hasDays ? ':' : '') + d.toString().padStart(2, '0') + r
        if (hasDays) {
            r = ':' + e.toString().padStart(3, '0') + r
            r = f + r
        }
        return r
    }
    P.reverse = function () {
        var a = this.toString()
        a = a.reverse()
        a = a.number()
        return isNaN(a) ? null : a
    }
    P.fitDim = function (dim=2) {
        return this.nrot(dim).floor().pow(dim)
    }
    P.signMul = function (mul=1) {
        return this.sign().mul(mul)
    }
    P.sfloor = function (step=1) { // Def: s means step
        return step == 0 ? this + 0 : this.div(step).floatFix().floor().mul(step)
    }
    P.sround = function (step=1) {
        return step == 0 ? this + 0 : this.div(step).floatFix().round().mul(step)
    }
    P.sceil = function (step=1) {
        return step == 0 ? this + 0 : this.div(step).floatFix().ceil().mul(step)
    }
    P.toRGB = function (hasAlpha=false) {
        var a = [
            this.div(65536).floor()%256,
            this.div(256).floor()%256,
            this.floor()%256,
        ]
        if (hasAlpha) a.push(this.div(16777216).floor()%256)
        return a
    }
    P.dist = function (i) {
        return (this - i).abs()
    }
    P.split = function (by = '') {
        var a = this.toString().split(by)
        return a.map(v => {
            return isNaN(Number(v)) ? v : Number(v)
        })
    }
    P.reverseGroups = function (groupSize) {
        var a = this.split()
        a = a.reverseGroups(groupSize)
        return a.joinNum()
    }
    P.radtodeg = function () {
        return this * Math.degrad
    }
    P.degtorad = function () {
        return this / Math.degrad
    }
    P.hasDec = function () {
        return this % 1 != 0
    }
    P.limz = function () { // Def: limit zero
        return this.max(0)
    }
    P.location = function (from, to) {
        return (this - from) / (to - from)
    }
    P.ellip2 = function () {
        return Math.PI * this ** 2
    }
    P.ellip3 = function () {
        return (4 / 3) * Math.PI * this ** 3
    }
    P.divabs = function (i) {
        var a = [this, i]
        if (i > this) a.reverse()
        return a[0] / a[1]
    }
    P.getdec = function () {
        return this % 1
    }
    P.separate = function (rev=false) {
        var a = [Math.floor(this), this % 1]
        if (rev) a.reverse()
        return a
    }
    P.loga = function () {
        var t = this.abs(),
            a = t<1 ? t : t/t.lfloor(10),
            b = t.log10().floor()
            c = b.log10().floor(),
            o = [this.sign()]
        b = b/b.lfloor(10)
        a = a>=10?a/10:a // float fixing
        b = b>=10?b/10:b
        o.push(a)
        if (t >= 10) o.push(b)
        if (t >= 1e10) o.push(c)
        return o
    }
    P.toStringFix = function (step=0.01, emax=6, emin=-6) {
        if (this.isNeg()&this.isInf()) return '-Infinity'
        if (this.isInf()) return 'Infinity'
        if (this.isNaN()) return 'NaN'
        if (this.isz()) return '0'
        var a = this.abs(),
            b = this.abs().min(1).lfloor(10), c
        if (a >= 10 ** emax | a <= 10 ** emin) {
            c = a.div(a.lfloor(10)).sfloor(step).floatFix() + 'e' + a.log10().floor()
        } else {
            c = a.sfloor(step * b).floatFix()
        }
        return (this.isNeg() ? '-' : '') + c
    }
    P.modabs = function (i) {
        var a = this.abs().mod(i)
        return (this.isNeg() ? i - a : a) % i
    }
    P.toLocaleString2 = function () {
        return this.toLocaleString().split('').exclude(',').join('')
    }
    P.divf = function (i) {
        return (this / i).floor()
    }
    P.mix = function (i) {
        return (this + i) / 2
    }
    P.divisors = function () {
        var out = []
        for (var i = 0; i < this / 2 + 1; i++) {
            if (this / i % 1 == 0) out.push(this / i)
        }
        out.push(1)
        return out
    }
    P.thres = function (maxat=1, equal=true) {
        var a = this.floor()
            b = this.modabs(1)
        return (equal ? b >= maxat : b > maxat) ? a + 1 : a
    }
    P.sthres = function (step=1, maxat=1, equal=true) {
        return this.div(step).thres(maxat, equal) * step
    }
    P.lthres = function (step=10, maxat=1, equal=true) {
        return this.logb(step).floatFix().thres(maxat, equal).bas(step)
    }
    P.fromCharCode = function () {
        return String.fromCharCode(this)
    }
    P.triareaIsos = function (w, h) {
        return w * h / 2
    }
    P.triareaEqui = function (w) {
        return (0.75).sqrt() * w ** 2
    }
    P.rs = function (i) { // Def: right shift
        return this >> i
    }
    P.ls = function (i) { // Def: left shift
        return this << i
    }
    P.rsu = function (i) { // Def: unsigned right shift
        return this >>> i
    }
    P.digitAt = function (i) {
        return (this.abs() % 10 ** (i + 1) / 10 ** i).floatFix(7).floor() % 10
    }
    P.toStringWrite = function (hasIllions=true, flipSym=false) {
        if (this.isNeg()&this.isInf()) return '-∞'
        if (this.isInf()) return '∞'
        var n = this.isNeg(),
            d = this.abs().log10().floor(),
            e = this.abs().dti()
            f = e.log10().floor()
        var a = '0'.repeat(d.max(0) + 1).map((v,i) => {
            return this.abs().toNumber().digitAt(d - i).toString()
        })
        if (hasIllions) a = a.putevery(flipSym ? '.' : ',', 4, a.length % 3, 0)
        var b = '0'.repeat(f.max(0) + 1).map((v,i) => {
            return e.toNumber().digitAt(f.max(0) - i).toString()
        })
        return (n ? '-' : '') + a + (b == '0' ? '' : (flipSym ? ',' : '.') + b)
    }
    P.sdi = function (isDecAbs=true) { // Def: sign, decimal, integer
        return [this.sign(), isDecAbs ? this.modabs(1) : (this % 1).abs(), this.floor()]
    }
    P.to0x = function () {
        return '0x' + this.toString(16)
    }
    P.reverse = function (a=0, b=1) {
        return b - (this - a)
    }
    
    S.DIST = Math.log10(Number.MAX_SAFE_INTEGER)/Math.log10(Number.MAX_VALUE)
    S.BIT32 = 2 ** 31 - 1
    S.BIT64 = 2 ** 63 - 1
    
    AddObj(Number, P, S, 'Number')
    P = {}, S = {}
    
    // NUMBERS End

    // BOOLEANS
    
    P.ifelse = function (i, e) {
        return this ? i : e
    }
    P.not = function () {
        return !this
    }
    P.and = function (i) {
        return Boolean(this & i)
    }
    P.or = function (i) {
        return Boolean(this | i)
    }
    P.xor = function (i) {
        return Boolean(this ^ i)
    }
    P.pon = function () { // Def: Positive or negative
        return this ? 1 : -1
    }

    S.muland = (...i)=>{
        var r = true
        i.forEach(v => {
            r = r.and(v)
        })
        return r
    }
    S.mulor = (...i)=>{
        var r = false
        i.forEach(v => {
            r = r.or(v)
        })
        return r
    }
    
    AddObj(Boolean, P, S, 'Boolean')
    P = {}, S = {}
    
    // BOOLEANS End

    // STRINGS
    
    P.replaceAt = function(i, e) {
        return this.substr(0, i) + e + this.substr(i + e.length);
    }
    P.befj = function (...i) {
        i.push(this)
        i = i.join('')
        return i
    }
    P.html = function (i, attr) {
        return `<${i}${attr==undefined?'':' '+attr}>${this}</${i}>`
    }
    P.html2 = function (i, attr) {
        return `<${this}${attr==undefined?'':' '+attr}>${i}</${this}>`
    }
    P.reverse = function () {
        var a = this
        a = a.split('')
        a.reverse()
        return a.join('')
    }
    P.del = function (id) {
        return this.substr(0, id) + this.substr(id + 1, this.length - id - 1)
    }
    P.fitEnd = function (l, f='') {
        l = Math.max(l, 0)
        var a = this
        if (a.length < l) {
            if (f != '') {
                while (a.length != l) {
                    a += f
                }
            }
        } else if (a.length > l) {
            while (a.length != l) {
                a = a.slice(0, -1)
            }
        }
        return a+''
    }
    P.fitStart = function (l, f='') {
        l = Math.max(l, 0)
        var a = this
        if (a.length < l) {
            if (f != '') {
                while (a.length != l) {
                    a = f + a
                }
            }
        } else if (a.length > l) {
            while (a.length != l) {
                a = a.slice(1)
            }
        }
        return a+''
    }
    P.loopIncludes = function (i, a=2) {
        return this.repeat(a).includes(i)
    }
    P.heading = function (i, id='', Class='') {
        i = Number(i||1).min(6).max(1).floor()
        return `<h${i}${id==''?'':` id="${id}"`}${Class==''?'':` class="${Class}"`}>${this}</h${i}>`
    }
    P.change = function (i) {
        var a = this
        for (var b = 0; b < a.length; b++) {
            a = a.replaceAt(b, i[b % i.length])
        }
        return a
    }
    P.toClipboard = function () {
        var el = document.createElement('textarea')
        el.value = this
        el.setAttribute('readonly', '')
        el.style = {position: 'absolute', left: '-9999px'}
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
    }
    P.func = function (isEval) {
        return isEval ? eval(this) : new Function(this)
    }
    P.autoCase = function () {
        var a = this.split(' ')
        a = a.map(v => {
            return v.replaceAt(0, v[0].toUpperCase())
        })
        return a.join(' ')
    }
    P.argSplit = function (by, strStart, strEnd, inStr) {
        var o = [], t = '', str = false, a = false, input = this
        for (var i=0; i<input.length+1; i++) {
            if ((input[i] == by | input[i] == undefined) & !str) {
                o.push(t)
                t = ''
            } else {
                a = false
                if (input[i] == strStart & !str) {
                    str = true
                    a = true
                    inStr ? i++ : 0
                } if (input[i] == strEnd & str & !a) {
                    str = false
                    inStr ? i++ : 0
                    if ((input[i] == by | input[i] == undefined) & inStr) {
                        o.push(t)
                        t = ''
                        i++
                    }
                }
                t += input[i]
            }
        }
        return o
    }
    P.isHTML = function () {
        var a = document.createElement('div');
        a.innerHTML = this;
        for (var c = a.childNodes, i = c.length; i--; ) {
            if (c[i].nodeType == 1) return true; 
        };
        return false;
    }
    P.atob = function () {
        return atob(this)
    }
    P.btoa = function () {
        return btoa(this)
    }
    P.parse = function () {
        return JSON.parse(this)
    }
    P.forEach = function (f, array=false) {
        if (array) {
            this.split('').forEach(f)
        } else {
            for (var i = 0; i < this.length; i++) {
                f(this[i], i, this)
            }
        }
    }
    P.map = function (f, array=false) {
        if (array) {
            var a = this.split('')
            a.map(f)
            return a.join('')
        } else {
            var a = this
            for (var i = 0; i < this.length; i++) {
                a = a.replaceAt(i, f(this[i], i, this))
            }
            return a
        }
    }
    P.shiftChar = function (amm) {
        return this.map((v,i)=>{
            return String.fromCharCode(v.charCodeAt() + amm)
        })
    }
    P.bigintFix = function () {
        if (this.last() == 'n') {
            a = this.removeside(true)
        } else a=this
        return BigInt(a)
    }
    P.trimSplit = function (by) {
        var a = this.split(by)
        return a.map(v=>{return v.trim()})
    }
    P.trimSplitJoin = function (by) {
        var a = this.trimSplit(by)
        return a.join(by)
    }
    P.reverseGroups = function (groupSize) {
        return this.split('').reverseGroups(groupSize).join('')
    }
    P.removeSplit = function (by, spliceStart, spliceCount, not = false) {
        var a = this.split(by)
        if (not) {
            return a.splice(spliceStart, spliceCount).join(by)
        } else {
            a.splice(spliceStart, spliceCount)
            return a.join(by)
        }
    }
    P.last = function () {
        return this[this.length - 1]
    }
    P.unstreq = function (i) {
        return this.toLowerCase() == i.toLowerCase()
    }
    P.removeside = function (isEnd=true) {
        return isEnd ? this.del(this.length - 1) : this.del(0)
    }
    P.fractal = function (int, last) { // Use '$r' in string to apply iterations
        var a = this.replaceAll('$r', last)
        for (var i = 0; i < int; i++) {
            a = this.replaceAll('$r', a)
        }
        return a
    }
    P.repeatDec = function (amm=1) {
        var a = this.repeat(Number(amm + 1).limz())
        return a.substr(0, a.length - this.length * (1 - (amm % 1)))
    }
    P.findFirst = function (target, lastCounts = false) {
        if (Array.isArray(target)) {
            var a = [], b
            target.forEach(v=>{
                b = this.split('').indexOf(v)
                a.push(lastCounts ? (b == -1 ? this.length : b) : b)
            })
            return a.min()
        } else {
            var a = this.split('').indexOf(target)
            return lastCounts ? (a == -1 ? this.length : a) : a
        }
    }
    P.findLast = function (target, lastCounts = false) {
        if (Array.isArray(target)) {
            var a = [], b
            target.forEach(v=>{
                b = this.split('').reverse().indexOf(v).neg(this.length).sub(1)
                a.push(lastCounts ? (b == -1 ? this.length : b) : b)
            })
            return a.max()
        } else {
            var a = this.split('').reverse().indexOf(target).neg(this.length).sub(1)
            return lastCounts ? (a == -1 ? this.length : a) : a
        }
    }
    P.cutFirst = function (pos, isLast=0) {
        if (typeof pos == 'string' | Array.isArray(pos)) {
            pos = isLast ? this.findLast(pos, 1) : this.findFirst(pos, 1)
        }
        return this.substr(pos, this.length - pos)
    }
    P.cutLast = function (pos, isLast=0) {
        if (typeof pos == 'string' | Array.isArray(pos)) {
            pos = this.length - (isLast ? this.findLast(pos, 1) : this.findFirst(pos, 1))
        }
        return this.substr(0, this.length - pos)
    }
    P.until = function (start=0, until='', mode=0, strmode=0) {
        if (typeof start == 'string') {
            start = this.findFirst(start)
        }
        var a = this.substr(start + (strmode>=2?1:0)),
            b = this.length - a.length
            c = a.findFirst(until, 1) + b,
            d = a.substr(0, a.findFirst(until, 1) + (strmode==1?1:0))
        return mode ? d : c
    }
    P.untilPrt = function (start=0, group='{', until='}', mode, strmode=0, strignore=true, endignore='\\') {
        if (typeof start == 'string') {
            start = this.findFirst(start)
        }
        if (group != until & !Array.isArray(group) & !Array.isArray(until)) {
            group = [group]
            until = [until]
        }
        var b = '', a = start
        while (!group.includes(this[a]) & this[a] != undefined) {
            b += this[a]
            a++
        }
        var c = a
        var step = [0].repeat(group.length), d = ''
        while (!(((step.sum() == 0) & a != c) | this[a] == undefined)) {
            if (group == until & this[a] == group) {
                if (step[0] == 0) step[0] = 1;
                else if (this.detectRepeats(endignore, a, true) % 2 == 0) step[0] = 0
            } else {
                if (group.includes(this[a]) & until.includes(this[a])) {
                    if (strignore) {
                        if (d == this[a]) {
                            if (this.detectRepeats(endignore, a, true) % 2 == 0) {
                                d = ''
                                step[group.indexOf(this[a])] = 0
                            }
                        } else {
                            if (d == '') d = this[a]
                            step[group.indexOf(this[a])] = 1
                        }
                    } else {
                        step[group.indexOf(this[a])] = 1 - step[group.indexOf(this[a])]
                    }
                } else {
                    if (group.includes(this[a]) & d == '') step[group.indexOf(this[a])]++
                    if (until.includes(this[a]) & d == '') step[until.indexOf(this[a])]--
                }
            }
            b += this[a]
            a++
        }
        if (strmode != 1) b = b.cutLast(1)
        if (strmode == 2) b = b.substr(1)
        return mode ? b : a - 1
    }
    P.untilStrav = function (until='"', avoider='\\') { // Def: strav = string end avoider
        var w = until
        if (!until.isArray) until = [until]
        until = this.findFirst(until, 1)
        var end = this.whichFirst.apply(this, [0].concat(w))
        var a = until, b = ''
        while (!(this[a] == end & (this.detectRepeats(avoider, a, true) % 2 == 0) & (a != until)) & this[a] != undefined) {
            b += this[a]
            a++
        }
        return b
    }
    P.hasFirst = function (target, offset=0, mode) {
        if (!Array.isArray(target)) target = [target]
        var r = false, a = '', t = this.cutFirst(offset)
        target.forEach(v => {
            if (t.substr(0, v.length) == v) {
                r = true
                if (a == '') a = v
            }
        })
        return mode ? [r, a] : r
    }
    P.untilSplit = function (by, start='"', end='"') {
        if (!Array.isArray(start)) start = [start]
        if (!Array.isArray(end)) end = [end]
        var a = '', b = [], c = true
        for (var i = 0; i < this.length; i++) {
            if (this.substr(i).hasFirst(by,1)[0] & c) {
                b.push(a)
                a = ''
                i += this.substr(i).hasFirst(by,1)[1].length
            }
            if (start.includes(this[i]) & end.includes(this[i])) {
                c = !c
            } else {
                if (start.includes(this[i])) c = false
                if (end.includes(this[i])) c = true
            }
            a += this[i]
        }
        b.push(a)
        return b
    }
    P.untilSplitPrt = function (by, start='{', end='}', strignore=true, endignore='\\') {
        if (!Array.isArray(start)) start = [start]
        if (!Array.isArray(end)) end = [end]
        if (start.length != end.length) throw RangeError('[EasyMod.js] both start and end needs to have equal length')
        var a = '', b = [], c = [0].repeat(start.length), d = ''
        for (var i = 0; i < this.length; i++) {
            if (this.hasFirst(by,i) & c.sum() == 0) {
                b.push(a)
                a = ''
                i += this.hasFirst(by,i,1)[1].length
            }
            if (start.includes(this[i]) & end.includes(this[i])) {
                if (strignore) {
                    if (d == this[i]) {
                        if (this.detectRepeats(endignore, i, true) % 2 == 0) {
                            d = ''
                            c[start.indexOf(this[i])] = 0
                        }
                    } else {
                        d = this[i]
                        c[start.indexOf(this[i])] = 1
                    }
                } else {
                    c[start.indexOf(this[i])] = 1 - c[start.indexOf(this[i])]
                }
            } else {
                if (start.includes(this[i]) & d == '') c[start.indexOf(this[i])]++
                if (end.includes(this[i]) & d == '') c[end.indexOf(this[i])]--
            }
            a += this[i]
        }
        b.push(a)
        return b
    }
    P.shift = function (pos, ...strs) {
        pos = pos.floor()
        var a = this.concat.arrayCall(this, strs) + this,
            l = strs.map(v => {
                return v.length
            }).sum() + this.length
        return a.substr(pos.modabs(l), this.length)
    }
    P.exclude = function (...i) {
        var a = this
        i.forEach(v => {
            a = a.replaceAll(i, '')
        })
        return a
    }
    P.put = function (at=0, str) {
        return this.substr(0, at) + str + this.substr(at)
    }
    P.delmul = function (start=0, width=1) {
        return this.substr(0, start) + this.substr(start + width)
    }
    P.detectRepeats = function (str, at, isRev=false) {
        if (str == '') return 0
        var a = 0, b = at
        if (isRev) b -= str.length
        while (this.hasFirst(str, b)) {
            b += str.length * (isRev ? -1 : 1)
            a++
        }
        return a
    }
    P.merge = function ( ...str) {
        var length = str.map(v => {return v.length}).sum() + this.length,
            out = '',
            array = [this].concat(str)
        for (var i = 0; i < length; i++) {
            out += array[i % array.length][(i / array.length).floor()] || ''
        }
        return out
    }
    P.replaceMul = function (to, array) {
        var out = this
        array.forEach(v => {
            out = out.replaceAt(v, to)
        })
        return out
    }
    P.allowIf = function (f=()=>{}) {
        var a = ''
        this.forEach((v,i) => {
            if (f(v, i)) a += v
        })
        return a
    }
    P.findCount = function (str, abs = false, isArray = false) {
        if (str == '') return isArray ? [] : 0
        var out = isArray ? [] : 0
        for (var i = 0; i < this.length - (str.length - 1); i++) {
            if (this.hasFirst(str, i)) {
                if (isArray) out.push(i)
                else out++
                if (!abs) i += str.length - 1
            }
        }
        return out
    }
    P.corrupt = function (prob=0.2, ampli=2) {
        return this.map(v => {
            return Math.random() < prob ? (v.charCodeAt() + ampli.randomn()).fromCharCode() : v
        })
    }
    P.isUpperCase = function (index=0) {
        var a = this[index]
        return a.toLowerCase() != a
    }
    P.isLowerCase = function (index=0) {
        var a = this[index]
        return a.toUpperCase() != a
    }
    P.switchCase = function () {
        return this.map(v => {
            return v.isUpperCase() ? v.toLowerCase() : v.toUpperCase()
        })
    }
    P.isLetter = function (index=0) {
        return !(!this.isUpperCase(index) & !this.isLowerCase(index))
    }
    P.whichFirst = function (mode=0, ...str) {
        var a
        for (var i = 0; i < this.length; i++) {
            str.forEach(v => {
                if (this.hasFirst(v, i)) a = mode ? [v, i] : v
            })
            if (a) return a
        }
        return -1
    }
    P.toSymbol = function (benull = false) {
        if (this.hasFirst('Symbol(') & this.last() == ')') {
            return Symbol(this.substr(7).cutLast(1))
        } else {
            return benull ? null : Symbol()
        }
    }
    P.detectType = function (isType = false) {
        var a
        if (this == 'NaN') a = NaN;
        else if (this == 'undefined') a = undefined;
        else if (this == 'null') a = null;
        else if (this == 'false') a = false;
        else if (this == 'true') a = true;
        else {
            a = Number(this)
            if (isNaN(a)) {
                try {
                    a = this.bigintFix()
                } catch {
                    a = this.toSymbol(true)
                    if (!a)
                    try {
                        a = this.parse()
                    } catch {
                        a = this + ''
                    }
                }
            }
        }
        return isType ? a.type : a
    }
    P.isSymbol = function () {
        return!! (this.substr(0, 7) == 'Symbol(' & this[this.length - 1] == ')')
    }
    P.evalWorks = function () {
        try {
            Function(this)
            return true 
        } catch {
            return false
        }
    }
    P.error = function (type=0, isThrow=true) {
        if (typeof type == 'string' & EasyObj.errors.includes(type)) type = EasyObj.errors.indexOf(type)
        var a
        switch (type) {
            case 0: a = Error(this); break
            case 1: a = RangeError(this); break
            case 2: a = ReferenceError(this); break
            case 3: a = SyntaxError(this); break
            case 4: a = TypeError(this); break
            case 5: a = URIError(this); break
            case 6: a = EvalError(this); break
        }
        if (typeof type == 'string' & !EasyObj.errors.includes(type)) {
            a = type += new Error(this).stack
        }
        if (isThrow) {
            throw a
        } else {
            return a
        }
    }
    P.eqlength = function (str) {
        return this.length == str.length
    }
    P.putevery = function (str, every, offset, allow0=true) {
        var a = this + '', b = offset
        while (b < a.length) {
            if (allow0 ? true : b != 0) a = a.put(b, str)
            if (allow0 ? false : b == 0) b--
            b += every
        }
        return a
    }
    P.splitMul = function (arr) {
        if (!Array.isArray(arr)) arr = [arr]
        var a = [this+'']
        arr.forEach(x => {
            a = a.map(y => {return y.split(x)}).flat()
        })
        return a.flat()
    }
    P.setLocStr = function (name) { // Def: LocStr = Local Storage
        localStorage.setItem(name, this)
    }
    P.setCookie = function (name, time, returnStr=false) {
        var e = time ? "; expires=" + new Date().add(time).toUTCString() : "",
            a = name + "=" + (this.toString() || "")  + e + "; path=/";
        if (returnStr) return a;
        else document.cookie = a
    }
    P.toHTML = function (getInside=true) {
        var a = new DOMParser()
	    var b = a.parseFromString(this, 'text/html')
        var c = b.body
        if (getInside) return c.querySelector('*') // get first element
	    return c;
    }
    P.toHexCode = function (utf=8, joinby='') {
        if (utf!==8&utf!==16) '[EasyMod.js] Incorrect UTF type'.error(4)
        return this.split('').map(v => {
            return v.charCodeAt().toString(16).padStart(utf / 4, '0')
        }).join(joinby)
    }
    P.splitEvery = function (every=1, offset=0) {
        var a = [], b = ''
        for (var i=0;i<this.length;i++) {
            if ((i + offset) % every == 0) {
                a.push(b)
                b = ''
            }
            b += this[i]
        }
        if (a[0]=='') a.shift()
        a.push(b)
        return a
    }
    P.baseSwt = function (from = 10, to = 2) { // Def: base switch
        var a = parseInt(this, from)
        return a.toString(to)
    },
    P.parseInt = function (from = 16) {
        return parseInt(this, from)
    }
    P.hexToString = function (utf=8, splitter='') {
        if (utf!==8&utf!==16) '[EasyMod.js] Incorrect UTF type'.error(4)
        return (splitter == '' ? this.splitEvery(utf / 4) : this.split(splitter)).map(v => {
            return v.parseInt().fromCharCode()
        }).join('')
    }
    P.reverseGroups2 = function (groupSize) {
        return this.reverseGroups().reverse()
    }
    P.stringify = function (cover='"', avoider='\\') {
        return cover + this.replaceAll(cover, avoider + cover) + cover
    }
    P.unstringify = function (cover='"', avoider='\\') {
        if (this[0] == cover & this.last() == cover) {
            return this.removeside().removeside(0).replaceAll(avoider + cover, cover)
        } else return this
    }
    P.comp64 = function () {
        var a = btoa(this), b, c, o = ''
        for (var i of a) {
            b = i.charCodeAt()
            if (b >= 65 & b <= 90) c = b - 65;
            else if (b >= 97 & b <= 122) c = b - 71;
            else if (b >= 48 & b <= 57) c = b + 4;
            else if (b == 43) c = 62
            else if (b == 47) c = 63
            else if (b == 61) c = 64
            o += c.fromCharCode()
        }
        return o
    }
    P.deco64 = function () {
        var a = this, b, c, o = ''
        for (var i of a) {
            b = i.charCodeAt()
            if (b < 26) c = b + 65;
            else if (b >= 26 & b < 52) c = b + 71;
            else if (b >= 52 & b < 62) c = b - 4;
            else if (b == 62) c = 43
            else if (b == 63) c = 47
            else if (b == 64) c = 61
            o += c.fromCharCode()
        }
        return atob(o)
    }
    P.log = function (css='') {
        if (css) {
            console.log('%c' + this, css)
        } else {
            console.log(this.unnew())
        }
    }
    P.trimLines = function () {
        return this.split('\n').map(v => {return v.trim()}).join('\n')
    }
    P.syntaxComp = function (isError=false) { // Def: syntax compatibility
        try {
            new Function(this.unnew())
            return isError ? undefined : true
        } catch (e) {
            return isError ? e : false
        }
    }

    S.progress = (length, progress, full='|', empty='.')=>{
        var a = (length * progress).floor().max(0).min(length),
            b = length - a, out = ''
        for (var i = 0; i < a; i++) {
            out += full
        }
        for (var i = 0; i < b; i++) {
            out += empty
        }
        return out
    }
    S.blank = ''
    
    AddObj(String, P, S, 'String')
    P = {}, S = {}
    
    // STRINGS End

    // BIGINTS
    
    P.add = function (i) {
        return this + BigInt(i)
    }
    P.sub = function (i) {
        return this - BigInt(i)
    }
    P.inc = function () {
        return this + 1n
    }
    P.dec = function () {
        return this - 1n
    }
    P.mul = function (i) {
        return this * BigInt(i)
    }
    P.div = function (i) {
        return this / BigInt(i)
    }
    P.pow = function (i) {
        return this ** BigInt(i)
    }
    P.bas = function (i) {
        return BigInt(i) ** this
    }
    P.neg = function (i) {
        return BigInt(i) - this
    }
    P.abs = function (i) {
        var a = this + 0n
        if (a.isNeg()) a *= -1n
        return a
    }
    P.sign = function (i) {
        var a = Number(this)
        a = a.sign()
        return BigInt(a)
    }
    P.gt = function (i) {
        return this > i
    }
    P.gte = function (i) {
        return this >= i
    }
    P.lt = function (i) {
        return this < i
    }
    P.lte = function (i) {
        return this <= i
    }
    P.isz = function (i) {
        return this === 0n
    }
    P.isPos = function (e) {
        return e ? this >= 0 : this > 0
    }
    P.isNeg = function (e) {
        return e ? this <= 0 : this < 0
    }
    P.comp = function (i) {
        return (this-BigInt(i)).sign()
    }
    P.log10 = function () {
        return this.toNumber().log10()
    }
    P.log10a = function (floord = true) { // Def: logarithm 10 absolute
        if (this == 0n) return -Infinity
        var a = floord ? 0 : Number(this.toString().put(1, '.')).log10()
        return this.abs().toString().length - 1 + a
    }
    P.sfloor = function (step=10) {
        return this.toNumber().sfloor(step).toBigInt()
    }
    P.sround = function (step=10) {
        return this.toNumber().sround(step).toBigInt()
    }
    P.sceil = function (step=10) {
        return this.toNumber().sceil(step).toBigInt()
    }
    P.toStringFix = function (stepe=2, emax=6) {
        var a = this.abs().toString(),
            b = a.substr(0, stepe + 1).put(1, '.')
        if (this.log10a() >= emax) {
            var c = b + 'e' + this.log10a()
            return this.isNeg() ? '-' + c : c
        } else {
            return this.isNeg() ? '-' + a : a
        }
    } 
    
    AddObj(BigInt, P, S, 'BigInt')
    P = {}, S = {}
    
    // BIGINTS End

    // FUNCTIONS
    
    P.iterate = function (t, i) {
       if (t == 0) {return i;}
       else {return this(this.iterate(t-1,i));}
    }
    P.getArgs = function () {
        if (this.toString()[0] != 'f' & this.toString()[0] != '(') return this.toString().cutLast([' ', '='])
        return this.toString().untilPrt('(', '(', ')', 1, 2).untilSplitPrt(',',EasyObj.prt.s, EasyObj.prt.e).mapTrim().map(v => {
            return v.cutLast([' ', '='])
        })
    }
    P.getArgsAll = function () {
        if (this.toString()[0] != 'f' & this.toString()[0] != '(') return this.toString().cutLast([' ', '='])
        return this.toString().untilPrt('(', '(', ')', 1, 2).untilSplitPrt(',', EasyObj.prt.s, EasyObj.prt.e).mapTrim()
    }
    P.getCmd = function (mode) {
        if (this.toString()[0] != 'f' & this.toString()[0] != '(') {
            var b = this.toString().substr(this.toString().untilPrt(0, '(', ')', 1, 1)+1).cutFirst(['=','{']), z = false
            while ([' ','=','>'].includes(b[0])) {
                b = b.cutFirst(1)
            }
            if (b[0] != '{') z = true
            var a = b.untilPrt(0, EasyObj.prt.s, EasyObj.prt.e, 1, z ? 1 : 2)
            if (mode >= 1) a = a.split('\n')
            if (mode >= 2 & mode < 4) a = a.mapTrim()
            if (mode >= 3) c = c.exclude('')
            return a
        } else {
            var a = this.toString().untilPrt(0, '(', ')', 1, 1), z = false,
                b = this.toString().cutFirst(a.length)
            while ([' ','=','>'].includes(b[0])) {
                b = b.cutFirst(1)
            }
            if (b[0] != '{') z = true
            var c = b.untilPrt(0, EasyObj.prt.s, EasyObj.prt.e, 1, z ? 1 : 2)
            if (mode >= 1) c = c.split('\n')
            if (mode >= 2 & mode < 4) c = c.mapTrim()
            if (mode >= 3) c = c.exclude('')
            return c
        }
    }
    P.addLine = function (...i) {
        var a = this.getCommand()
        a = a.concat.apply(a, i)
        a = a.join('\n')
        return a.func()
    }
    P.arrayCall = function (args) {
        return this.apply(this, args)
    }
    P.reverseCall = function (...args) {
        args.reverse()
        return this.arrayCall(args)
    }
    P.iteration = function (start, length, onlyres=true) {
        var out = [], n = start
        for (var i = 0; i < length; i++) {
            n = this(n, i, out)
            out.push(n)
        }
        return onlyres ? out.last() : out
    }
    P.lagrun = function (amm) {
        var a = Date.now()
        for (var i = 0; i < amm; i++) {
            this(i)
        }
        return Date.now() - a
    }
    P.setArgs = function (array = []) {
        array.push(this.getCommand(4).join('\n'))
        return Function.apply(null, array)
    }
    P.setCmd = function (cmdstr = '') {
        var a = this.getArgsAll()
        a.push(cmdstr)
        return Function.apply(null, a)
    }
    P.evalrun = function (...args) {
        args = args.map(v => {return eval(v)})
        return this.apply(this, args)
    }
    P.void = function () {
        return void this()
    }
    P.trycatch = function (catchfunc, isreturn=false) {
        try {
            if (isreturn) {
                this()
                return true
            } else {
                return this()
            }
        } catch (e) {
            catchfunc(e)
            return isreturn ? undefined : false
        }
    }
    
    AddObj(Function, P, S, 'Function')
    P = {}, S = {}
    
    // FUNCTIONS End

    // ARRAYS
    
    P.pus = function(i) {
       return this.push(i)
    }
    P.con = function(i) {
       for (let j in i) {
          this.push(j)
       }
       return this
    }
    P.befj = function (...i) {
        i.push.apply(i, this)
        return i
    }
    P.fitEnd = function (l, f='', min) {
        l = Math.max(l, 0)
        var a = this
        if (a.length < l) {
            if (f != '') {
                while (a.length != l) {
                    a.push(f)
                }
            }
        } else if (a.length > l & !min) {
            while (a.length != l) {
                a.pop()
            }
        }
        return a
    }
    P.fitStart = function (l, f='', min) {
        l = Math.max(l, 0)
        var a = this
        if (a.length < l) {
            if (f != '') {
                while (a.length != l) {
                    a.befj(f)
                }
            }
        } else if (a.length > l & !min) {
            while (a.length != l) {
                a.shift()
            }
        }
        return a
    }
    P.valueMap = function (f) {
        var func = (i)=>{
            Object.keys(i).forEach((v,ip)=>{
                if (typeof i[v] == 'object') {
                    func(i[v])
                } else {
                    i[v] = f(i[v],v)
                }
            })
        }
        var a = this
        func(a)
        return a
    }
    P.sum = function (i=0) {
        return this.reduce((p,c)=>{
            return p + c
        }, 0) + i
    }
    P.sub = function (i=0, op=false) {
        var a = op ? this.reverse() : this
        b=a.spliceReturn(0, 1)
        return b.reduce((p,c)=>{
            return p - c
        }, a[0]) - i
    }
    P.prod = function (i=1) {
        return this.reduce((p,c)=>{
            return p * c
        }, 1) * i
    }
    P.quot = function (i=1, op=false) {
        var a = op ? this.reverse() : this
        b=a.spliceReturn(0, 1)
        return b.reduce((p,c)=>{
            return p / c
        }, a[0]) / i
    }
    P.pow = function (i=1, op=false) {
        var a = op ? this.reverse() : this
        b=a.spliceReturn(0, 1)
        return b.reduce((p,c)=>{
            return p ** c
        }, a[0]) ** i
    }
    P.gate = function () {
        var a = 0
        var b = false
        this.forEach(v => {
            if (v) {
                if (!b) a++
            } else {
                b = true
            }
        })
        return a
    }
    P.onlyAllow = function (isValue = false, ...i) {
        var a = []
        i.forEach(v=>{
            if (isValue) {
                if (this.includes(v)) a.push(v)
            } else {
                a.push(this[v])
            }
        })
        return a
    }
    P.stringify = function () {
        return JSON.stringify(this)
    }
    P.detectRepeats = function (isPos = false,isEnd = false) {
        var out = [],
            a = 0,
            b = 0,
            l = this[0]
        this.forEach((v,i)=>{
            if (v != l) {
                if (isEnd & isPos) {
                    out.push(i - 1)
                } else {
                    out.push(isPos?b:a)
                }
                a = 0
                b = i
                l = v
            }
            a++
        })
        if (isEnd & isPos) {
            out.push(this.length - 1)
        } else {
            out.push(isPos?b:a)
        }
        return out
    }
    P.getIndexes = function (...i) {
        var out = []
        i.forEach(v => {
            out.push(this.indexOf(v))
        })
        return out
    }
    P.max = function (pos = false) {
        var a = Math.max.apply(null, this)
        if (pos) {
            a = this.indexOf(a)
        }
        return a
    }
    P.min = function (pos = false) {
        var a = Math.min.apply(null, this)
        if (pos) {
            a = this.indexOf(a)
        }
        return a
    }
    P.split = function (by, value=true, exact=true) {
        var out = [],
            a = [],
            ign = false
        if (value) {
            this.forEach((v,i) => {
                ign = false
                if (exact ? v === by : v == by) {
                    out.push(a)
                    a = []
                    ign = true
                }
                if (!ign) a.push(v)
            });
        } else {
            this.forEach((v,i,ar)=>{
                if (i%by==0&!(i==0)) {
                    out.push(a)
                    a = []
                }
                a.push(v)
            })
        }
        out.push(a)
        return out
    }
    P.joinArray = function (by = []) {
        var a = this.reduce((p,c)=>{
            return p.concat(c, by)
        }, [])
        if (!(by.length == 0 & Array.isArray(by))) a.pop()
        return a
    }
    P.reverseGroups = function (groupSize) {
        var a = this.split(groupSize, false)
        a = a.reverse()
        return a.joinArray()
    }
    P.lastIndexOf = function (i) {
        return (this.length - 1) - this.reverse().indexOf(i)
    }
    P.detect = function (value, exact=true) {
        var out = []
        this.forEach((v,i)=>{
            if (exact ? v === value : v == value) out.push(i)
        })
        return out
    }
    P.spliceReturn = function (start, length) {
        var a = this.stringify().parse()
        a.splice(start, length)
        return a
    }
    P.toRGB = function () {
        var a = a.flat(),
            b = a[0].floor() * 65536 + a[1].floor() * 256 + a[2].floor()
    }
    P.compare = function (array, exact = false) {
        if (this.length == array.length) {
            var out = true
            this.forEach((v,i)=>{
                if (exact ? v !== array[i] :v != array[i]) out = false
            })
            return out
        } else {
            return false
        }
    }
    P.repeat = function (amm) {
        var a = this
        for (var i = 0; i < amm - 1; i++) {
            a = a.concat(this)
        }
        return amm == 0 ? [] : a
    }
    P.toObject = function (toString = false) {
        var out = {}
        if (toString) {
            this.forEach((v,i)=>{
                out[i.toString()] = v
            })
        } else {
            out = Object.assign({}, this)
        } 
        return out
    }
    P.joinNum = function (by = '') {
        return Number(this.join(by))
    }
    P.mapSum = function (array) {
        return this.map((v,i)=>{
            return v + array[i]
        })
    }
    P.mapProd = function (array) {
        return this.map((v,i)=>{
            return v * array[i]
        })
    }
    P.mapSub = function (array) {
        return this.map((v,i)=>{
            return v - array[i]
        })
    }
    P.mapQuot = function (array) {
        return this.map((v,i)=>{
            return v / array[i]
        })
    }
    P.toSave = function () {
        return this.stringify().btoa()
    }
    P.toFunctCmd = function (name='anonymous', str=false, ...args) {
        var a = 
        `function ${name}(${args.join(',')}) {${this.map(v=>{return '\t'+v}).join(';\n')}}`
        if (str) {
            return a
        } else {
            return new Function()
        }
    }
    P.toFunctArgs = function (name='anonymous', cmd, str=false) {
        var a = 
        `function ${name}(${this.join(',')}) {\n${cmd}\n}`
        if (str) {
            return a
        } else {
            return new Function()
        }
    }
    P.joinFunct = function () {
        return new Function(`[${this.toString()}].forEach((v,i)=>{v(i)})`)
    }
    P.onchange = function (f, delay) {
        var a = this()
        setInterval(()=>{
            if (a != this()) {
                f(this, a, this())
                a = this()
            }
        }, delay || 1000 / 30)
    }
    P.loga = function () {
        var a = this[1],
            b = this[2] || 0,
            c = this[3] || 0,
            d = b * 10 ** c,
            e = a * 10 ** d
        return e * this[0]
    }
    P.joinb = function () {
        return this.join('')
    }
    P.numToStr = function () {
        return this.map(v => {
            return String.fromCharCode(v)
        }).join('')
    }
    P.mapTrim = function (mode = 0) {
        return this.map(v => {
            switch (mode) {
                case 0: return v.trim()
                case 1: return v.trimStart()
                case 2: return v.trimEnd()
            }
        })
    }
    P.last = function () {
        return this[this.length - 1]
    }
    P.indexOfAll = function (input) {
        var a = []
        this.forEach((v,i) => {
            if (v === input) a.push(i)
        })
        return a
    }
    P.exclude = function (...i) {
        var a = []
        this.forEach(v => {
            if (!i.includes(v)) a.push(v)
        })
        return a
    }
    P.defaultAll = function () {
        return this.map(v => {
            return v.default()
        })
    }
    P.allowIf = function (f=()=>{}) {
        var a = []
        this.forEach((v,i) => {
            if (f(v, i)) a.push(v)
        })
        return a
    }
    P.sortNum = function (isRev=false) {
        this.sort((a, b) => {
            return a - b;
        });
        if (isRev) this.reverse()
        return this
    }
    P.allowProb = function (chance, isIndex = false, equalLength = false) {
        if (equalLength) {
            var out = isIndex ? this.getKeys().map(v => {return Number(v)}) : this.clone(),
                a = Math.ceil(this.length * (1 - chance))
            for (var i = 0; i < a; i++) {
                out.splice(out.length.random().floor(), 1)
            }
        } else {
            var out = []
            this.forEach((v,i) => {
                if (Math.random() < chance) out.push(isIndex ? i : v)
            })
        }
        return out
    }
    P.ruleFrac = function (iter) { // fractal with rule numbers
        iter = iter.floor()
        if (iter <= 0) return [0]
        if (iter == 1) return this
        var a, b = this
        for (var i = 0; i < iter - 1; i++) {
            a = []
            for (var x = 0; x < this.length; x++) {
                a = a.concat(b.map(v => {return v + this[x]}))
            }
            b = a
        }
        return a
    }
    P.removeRepeats = function () {
        return this.onlyAllow.apply(this,[0].concat(this.detectRepeats(1)))
    }
    P.grad = function (i) { // Def: gradient
        if (i == this.length) return this[this.length]
        var a = i % 1, b = i.floor()
        return this[b] * (1 - a) + this[b + 1] * a
    }
    P.reverseGroups2 = function (groupSize) {
        return this.reverseGroups().reverse()
    }
    P.chng = function (f=(current,next,index,array)=>{ // Def: change
        return Math.abs(current - next)
    }) {
        var a = []
        for (var i = 0; i < this.length - 1; i++) {
            a.push(f(this[i], this[i + 1], i, this))
        }
        return a
    }
    P.next = function (i=0, ignorezero=true) {
        var a
        return this.map(v => {
            a = v - i
            return (ignorezero ? a <= 0 : a < 0) ? Infinity : a
        }).min() + i
    }
    P.prev = function (i=0, ignorezero=true) {
        var a
        return this.map(v => {
            a = -(v - i)
            return (ignorezero ? a <= 0 : a < 0) ? Infinity : a
        }).min().neg() + i
    }
    
    S.fromto = (start = 1, end = 10, by = 1)=>{
        var out = []
        for (var i = start; i < end + by; i += by) {
            out.push(i)
        }
        return out
    }
    S.fromwidth = (start = 1, width = 10, by = 1)=>{
        var out = [], a
        for (var i = 0; i < width; i ++) {
            a = i * by + start
            out.push(a)
        }
        return out
    }
    S.formula = (f=()=>{}, dim=1, w=16, h=1, l=1, array=[]) => {
        var out
        switch (dim) {
            case 1: out = [0].repeat(w); break
            case 2: out = [[0].repeat(h)].repeat(w).clone(); break
            case 3: out = [[[0].repeat(l)].repeat(h)].repeat(w).clone(); break
        }
        for (var z = 0; z < (dim<3?1:l); z++) {
            for (var y = 0; y < (dim<2?1:h); y++) {
                for (var x = 0; x < w; x++) {
                    switch (dim) {
                        case 1: out[x] = f(x, 0, 0, w, 1, 1, array); break
                        case 2: out[x][y] = f(x, y, 0, w, h, 1, array); break
                        case 3: out[x][y][z] = f(x, y, z, w, h, l, array); break
                    }
                }
            }
        }
        return out
    }
    P.isArray = true
    
    AddObj(Array, P, S, 'Array')
    P = {}, S = {}
    
    // ARRAYS End

    // OBJECTS
    
    P.define = function (n, v) {
        this[n] = v
    }
    P.delete = function (n) {
        return delete this[n]
    }
    P.get = function (n) {
        return this[n]
    }
    P.valueMap = function (f) {
        var func = (i)=>{
            Object.keys(i).forEach((v,ip)=>{
                if (typeof i[v] == 'object') {
                    func(i[v])
                } else {
                    i[v] = f(i[v],v)
                }
            })
        }
        var a = this
        func(a)
        return a
    }
    P.gate = function () {
        var a = 0
        var b = false
        Object.keys(this).forEach(v => {
            if (this[v]) {
                if (!b) a++
            } else {
                b = true
            }
        })
        return a
    }
    P.onlyAllow = function (...i) {
        var a = {}
        i.forEach(v=>{
            a[v] = this[v]
        })
        return a
    }
    P.propNames = function (str=true) {
        return str ? Object.keys(this) : keys(this)
    }
    P.stringify = function () {
        return JSON.stringify(this)
    }
    P.path = function (...pathArray) {
        var obj = this
        pathArray.forEach(v=>{
            obj = obj[v]
        })
        return obj
    }
    P.sharechd = function (objvar) {
        Object.keys(this).forEach(v => {
            objvar[v] = this[v]
        })
    }
    P.removechd = function (...i) {
        if (i.compare([])) {
            i = Object.keys(this)
        }
        i.forEach(v => {
            delete this[v]
        })
    }
    P.toSave = function () {
        return this.stringify().btoa()
    }
    P.getLength = function () {
        return Object.keys(this).length
    }
    P.forEach = function (f) {
        for (var i = 0; i < this.getLength(); i++) {
            f(this[Object.keys(this)[i]], Object.keys(this)[i], i, this)
        }
    }
    P.map = function (f) {
        var a = this.stringify().parse()
        for (var i = 0; i < this.getLength(); i++) {
            a[Object.keys(this)[i]] = f(a[Object.keys(this)[i]], Object.keys(this)[i], i, this)
        }
        return a
    }
    P.entries = function (stringOnly = false) {
        return Object.entries(this) 
    }
    P.toArray = function (absolute = false) {
        if (absolute) {
            return Object.assign([], this)
        } else {
            var out = []
            Object.keys(this).forEach(v=>{
                out.push(this[v])
            })
            return out
        }
    }
    P.reverse = function () {
        var out = {}
        Object.keys(this).reverse().forEach(v => {
            out[v] = this[v]
        })
        return out
    }
    P.sort = function () {
        var out = {}
        Object.keys(this).sort().forEach(v => {
            out[v] = this[v]
        })
        return out
    }
    P.allowSyntax = function (mode=0) { // Only allows properties that doesn't need to do "obj['.prop']""
        var a = Object.keys(this), b
        if (mode == 0) {
            b = {}
        } else {
            b = []
        }
        a.forEach(v=>{
            try {
                new Function(`z.${v}`)
                switch (mode) {
                    case 0:
                        b[v] = this[v]
                    break; case 1:
                        b.push(v)
                    break; case 2:
                        b.push(this[v])
                    break; case 3:
                        b.push(true)
                }
            } catch {
                if (mode == 3) {
                    b.push(false)
                }
            }
        })
        return b
    }
    P.rename = function (target, name) {
        if (target !== name) {
            this[name] = this[target]
            delete this[target]
        }
    }
    P.mapName = function (f) {
        var o = Object.keys(this), a = this.stringify().parse()
        o.forEach((v,i,a) => {
            a.rename(v, f(v,i,a,this))
        })
        return a
    }
    P.getKeys = function () {
        return Object.keys(this)
    }
    P.includes = function (val, isPropName=false) {
        if (isPropName) {
            return this.toArray().includes(val)
        } else {
            return this.keys().includes(val)
        }
    }
    P.hasProp = function (obj, amm=-1) {
        amm = amm == -1 ? obj.getLength() : amm
        var a = 0
        this.forEach((v,i)=>{
            if (obj.includes(i)) a++
        })
        return a >= amm
    }
    P.merge = function (obj) {
        return Object.assign(this, obj)
    }
    P.assignTo = function (obj) {
        return Object.assign(obj, this)
    }
    P.clone = function (way=0) {
        switch (way) {
            case 0: return this.stringify().parse()
            case 1: return {...this}
            case 2: return Object.assign({}, this)
        }
    }
    P.dupli = function (target, name) {
        this[name] = this[target]
    }
    P.allowIf = function (f=()=>{}) {
        var a = {}
        this.propNames().forEach((v,i) => {
            if (f(this[v], v, i)) a[v] = this[v]
        })
        return a
    }
    P.clonepr = function (target, into) {
        this[into] = this[target]
    }
    
    // ANY
    
    P.switchType = function (type, isFunc, useNew=true) {
        if (isFunc) {
            if (self[type] == undefined) {
                throw TypeError('[EasyMod.js] 1: type is invalid')
            } else {
                try {
                    if (!useNew) throw Error(' is not a constructor')
                    return new self[type](this)
                } catch (e) {
                    e = e.toString()
                    if (e.includes(' is not a constructor')) {
                        try {
                            return self[type](this)
                        } catch (e) {
                            throw Error(e)
                        }
                    } else {
                        throw Error(e)
                    }
                }
            }
        } else {
            switch (type) {
                case 'number': return Number(this); break
                case 'string': return String(this); break
                case 'boolean': return Boolean(this); break
                case 'bigint': return BigInt(this); break
                case 'object': return Object(this); break
                case 'array': return Array(this); break
                case 'symbol': return Symbol(this); break
                case 'undefined': return undefined; break
            }
            throw TypeError('[EasyMod.js] 1: type is invalid')
        }
    }
    P.getType = function () {
        return typeof this
    }
    P.truefy = function () {
        if (this.type == 'object') {
            this.__proto__.sharechd(this)
        } else {
            var a = {index: this}
            this.__proto__.sharechd(a)
            return a
        }
    }
    P.effect = function (funct) {
        return funct(this, typeof this)
    }
    P.isType = function (type) {
        return type == this.type
    }
    P.toNumber = function () {
        return Number(this)
    }
    P.toBigInt = function () {
        if (typeof this == 'number') return BigInt(this.floor())
        return BigInt(this)
    }
    P.default = function () {
        switch (this.type) {
            case 'number': return 0
            case 'string': return ''
            case 'bigint': return 0n
            case 'boolean': return false
            case 'function': return function(){}
            case 'object':
                if (Array.isArray(this)) {
                    return []
                } else return {}
        }
    }
    P.isArray = function () {
        return Array.isArray(this)
    }
    P.unnew = function (objectClone=true) {
        switch (this.type) {
            case 'number': return this + 0
            case 'string': return this + ''
            case 'bigint': return this + 0n
            case 'boolean': return Number(this) ? true : false
            case 'object': return objectClone ? this.clone(1) : this
        }
        return this
    }
    P.newfy = function () {
        return Object(this)
    }
    P.effect = function (funct) {
        return funct(this)
    }
    P.ciu = function (i=0) { // Def: Change if undefined
        return this ?? i
    }
    P.eq = function (i) {
        return this.unnew() == i.unnew()
    }
    P.ex = function (i) {
        return this.unnew() === i.unnew()
    }
    P.eqn = function (i) {
        return this.unnew() != i.unnew()
    }
    P.exn = function (i) {
        return this.unnew() !== i.unnew()
    }
    P.isArray = false
    P.methodIter = function (methodname, iter=1, ...args) {
        var a = this.unnew()
        for (var i = 0; i < iter; i++) {
            a = a[methodname].apply(a, args)
        }
        return a
    }
    P.deletable = function (propName) {
        var a = this[propName], b
        b = delete this[propName]
        if (b) this[propName] = a
        return b
    }
    P.isThis = false
    P.objectType = function () {
        switch (this.type) {
            case 'number': return 'Number'
            case 'string': return 'String'
            case 'boolean': return 'Boolean'
            case 'bigint': return 'BigInt'
            case 'symbol': return 'Symbol'
        }
        if (this.isArray) return 'Array'
        if (!this.toString().hasFirst('[object ')) throw Error('[EasyMod.js] Object does not have the original toString function')
        return this.toString().substr(8).cutLast(1)
    }
    
    AddObj(Object, P, S, 'Object')
    P = {}, S = {}
    
    // OBJECTS End

    // Date
    
    P.since = function (t) {
        t = new Date(t)
        return this.getTime() - t.getTime()
    }
    P.daysSinceYear = function (t) {
        return (this.getTime() - new Date('year ' + t).getTime()) / 8.64e7
    }
    P.add = function (i) {
        i = new Date(i)
        return new Date(this.getTime() + i.getTime())
    }
    P.sub = function (i) {
        i = new Date(i)
        return new Date(this.getTime() - i.getTime())
    }
    P.getAbsDay = function () {
        var a = this.getDate(),
            b = this.getMonth(),
            l = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            m = l.splice(0, b).sum()
        return a + m - 1
    }
    P.toTimeStr = function (hasMS = false) {
        var a = this.getMilliseconds(),
            b = this.getSeconds(),
            c = this.getMinutes(),
            d = this.getHours(),
            e = this.getAbsDay(),
            f = this.getFullYear(),
            out = []
        if ((a != 0 | b == 0) & hasMS) out.push(a + ' milliseconds')
        if (b != 0) out.push(b + ' seconds')
        if (c != 0) out.push(c + ' minutes')
        if (d != 0) out.push(d + ' hours')
        if (e != 0) out.push(e + ' days')
        if (f != 0) out.push(f + ' years')
        return out.join(', ')
    }
    
    AddObj(Date, P, S, 'Date')
    P = {}, S = {}
    
    // DATE End

    // ImageData
    
    P.arrayfy = function () {
        var data = this.data
        var a = Array(4),
            b = [a].repeat(this.height),
            c = [b].repeat(this.width)
        data.forEach((v,i)=>{
            c[(i/(4*this.height)).floor()][((i/4)%this.height).floor()][i%4] = v
        })
        return c
    }
    P.editpx = function (x=0, y=0, color=[0,0,0,0], hasAlpha) {
        var data = this.data
        var c = typeof color == 'number' ? [
            color.div(65536).floor() % 256,
            color.div(256).floor() % 256,
            color.floor() % 256,
            hasAlpha ? (color.div(16777216).floor() % 256) : 255
        ] : [
            color[0].floor().max(0).min(255),
            color[1].floor().max(0).min(255),
            color[2].floor().max(0).min(255),
            color[3].floor().max(0).min(255)
        ]
    
        data[(x + y * this.width) * 4 + 0] = c[0]
        data[(x + y * this.width) * 4 + 1] = c[1]
        data[(x + y * this.width) * 4 + 2] = c[2]
        data[(x + y * this.width) * 4 + 3] = c[3]
    }
    P.getpx = function (x, y, hasAlpha=true) {
        var a = [
            data[(x + y * this.width) * 4 + 0],
            data[(x + y * this.width) * 4 + 1],
            data[(x + y * this.width) * 4 + 2]
        ]
        if (hasAlpha) a.push(data[(x + y * this.width) * 4 + 3])
        return a
    }
    P.formula = function (f=()=>{}, hasAlpha) {
        var data = this.data
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                this.editpx(x, y, f(x, y, x + y * this.width, [
                    this.getpx(x,y,hasAlpha)[0],
                    this.getpx(x,y,hasAlpha)[1],
                    this.getpx(x,y,hasAlpha)[2],
                    hasAlpha ? this.getpx(x,y,true)[3] : 255
                ]), hasAlpha)
            }
        }
        return this
    }
    
    if (!EasyObj.isNode) {
        AddObj(ImageData, P, S, 'ImageData')
        P = {}, S = {}
    }
    
    // IMAGEDATA End

    // Math
    
    S.degrad = 360/(Math.PI*2)
    S.distance = (x, y) => {
        if (typeof x != 'object' | typeof y != 'object') throw TypeError('[EasyMod.js] Both X and Y values needs to be object or array')
        if (x.length == y.length) {
            var a = []
            x.forEach((v,i)=>{
                a.push([v,y[i]])
            })
            a = a.map(v=>{
                return (v[0] - v[1]) ** 2
            })
            return a.sum().sqrt()
        } else {
            return NaN
        }
    }
    S.chanceTotal = (...i) => {
        return i.reduce((p,c)=>{
            return p + 1 / c
        }, 0)
    }
    S.average = (...i) => {
        return i.sum() / i.length
    }
    S.averagelog = (...i) => {
        return i.prod().nrot(i.length)
    }
    S.maxuntil = (array, max) => {
        var m = max / array.max()
        return array.map(v => {return v * m})
    }
    S.minuntil = (array, min) => {
        var m = min / array.min()
        return array.map(v => {return v * m})
    }
    S.maxindex = (...values) => {
        return values.indexOf(Math.max.apply(null, values))
    }
    S.minindex = (...values) => {
        return values.indexOf(Math.min.apply(null, values))
    }
    S.closest = (array, to, mode) => {
        var a = array.map(v => (v - to).abs())
        return mode ? Math.minindex.apply(null, a) : array[Math.minindex.apply(null, a)]
    }
    S.farthest = (array, to, mode) => {
        var a = array.map(v => (v - to).abs())
        return mode ? Math.maxindex.apply(null, a) : array[Math.maxindex.apply(null, a)]
    }
    S.isIns1 = (x, bx=0, bw=1) => {
        return !! (x >= bx & x < bx + bw)
    }
    S.isIns2 = (x, y, bx=0, by=0, bw=1, bh=1) => {
        return !! (x >= bx & y >= by & x < bx + bw & y < by + bh)
    }
    S.isIns3 = (x, y, z, bx=0, by=0, bz=0, bw=1, bh=1, bl=1) => {
        return !! (x >= bx & y >= by & z >= bz & x < bx + bw & y < by + bh & z < bz + bl)
    }
    S.isBetw = (x, a, b, mode=0) => {
        return !! ((mode%2==0 ? x >= a : x > a) & (mode/2<1 ? x <= a : x < a))
    }
    S.findNext = (x, y) => {
        return y - x + y
    }
    S.findNext3 = (x, y, z) => {
        return z * 3 - y * 3 + x
    }
    S.TAU = Math.PI * 2
    S.aver = (...i) => {
        return i.sum() / i.length
    },
    
    AddObj(Math, P, S, 'Math')

    // MATH End
    
    // Detecting
    if (!EasyObj.isNode) {
        document.addEventListener('keydown', e => {
            EasyObj.key.id.code[e.code] = true
            EasyObj.key.id.key[e.key] = true
            EasyObj.key.id.num[e.keyCode] = true
            EasyObj.key.id.any = true
        })
        document.addEventListener('keyup', e => {
            if (EasyObj.key.compressed) {
                delete EasyObj.key.id.code[e.code]
                delete EasyObj.key.id.key[e.key]
                delete EasyObj.key.id.num[e.keyCode]
            } else {
                EasyObj.key.id.code[e.code] = false
                EasyObj.key.id.key[e.key] = false
                EasyObj.key.id.num[e.keyCode] = false
            }
            EasyObj.key.id.any = false
        })
        document.addEventListener('mousedown', () => EasyObj.mouseDown = true)
        document.addEventListener('mouseup', () => EasyObj.mouseDown = false)
        
        document.addEventListener('mousemove', e => {
            EasyObj.doc.msePos.x = e.x
            EasyObj.doc.msePos.y = e.y
        });
        document.addEventListener('mousedown', e => {
            EasyObj.doc.lmsePos.x = e.x
            EasyObj.doc.lmsePos.y = e.y
        });
    
        document.addEventListener('wheel', (e) => {
            EasyObj.mouse.scr = e.deltaY
            y = EasyObj.mouse.scrs = EasyObj.mouse.scr.sign()
        })
        document.addEventListener('mousedown', (e) => {
            switch (e.which) {
                case 1: EasyObj.mouse.ldown = true; EasyObj.mouse.sdown = true; break
                case 2: EasyObj.mouse.mdown = true; break
                case 3: EasyObj.mouse.rdown = true; EasyObj.mouse.sdown = true; break
            }
            EasyObj.mouse.down = true
        })
        document.addEventListener('mouseup', (e) => {
            switch (e.which) {
                case 1: EasyObj.mouse.ldown = false; EasyObj.mouse.sdown = false; break
                case 2: EasyObj.mouse.mdown = false; break
                case 3: EasyObj.mouse.rdown = false; EasyObj.mouse.sdown = false; break
            }
            EasyObj.mouse.down = false
        })
    }

    if (EasyObj.setint) {
        setInterval(()=>{ // Random value between 0 and 1. Set once every script.
            EasyObj.random = Math.random()
        }, 10)
    }
    if (EasyObj.setint & !EasyObj.isNode) {
        setTimeout(()=>{
            EasyObj.dc.title = (document.querySelector('html>head>title') || {}).innerHTML
            EasyObj.dc.icon = (document.querySelector('html>head>link[rel="shortcut icon"]') || {}).href
        },10)
    }

    if (!EasyObj.isNode) window.addEventListener('beforeunload', function (e) {
        if (EasyObj.saveWarn) {
            e.preventDefault();
            e.returnValue = ''
        }
    })

    var addm = 0
    var addm2 = 0, q
    add.proto.forEach((v)=>{
        addm += v.length
        addm2 += v.length
    })
    add.static.forEach((v,u)=>{
        addm += v.length
        addm2 += v.allowIf(w => {
            return typeof this[u][w] == 'function'
        }).length
    })
    add.totalAdds = addm
    EasyObj.info.a.newfuncts = addm2
    

    var time = Date.now()
    if (EasyObj.setint) setInterval(()=>{
        EasyObj.time = Date.now() - time
    }, 10)

    //Type method
    Number.prototype.type = 'number'
    Boolean.prototype.type = 'boolean'
    String.prototype.type = 'string'
    BigInt.prototype.type = 'bigint'
    Object.prototype.type = 'object'
    Symbol.prototype.type = 'symbol'

    isThis = true

})() // 96.0% from 2k to 3k!    (if modding update this lol)
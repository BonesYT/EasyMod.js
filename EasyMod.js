/* This is EasyMod.js
   By BonesYT (start: 19:48 03/01/2022 DD/MM/YYYY)
              (release: 11:58 04/01/2022 DD/MM/YYYY)
              (update: 22:22 21/01/2022 DD/MM/YYYY) <-- edit this as well when modding
   Last modded by: (no one)
   EasyMod.js basically adds functions to strings, numbers, etc.
   Please don't copy! 
   
   NOTE: if you're modding/forking this, just remember, also change the .min.js file and in that file,
   change the EasyMod.isMinimum variable to true!
   Also, if there's a new function/type, please add it to EasyObj.added.changed array!
   
   */

// EasyMod's Object

var EasyObj = {
    added: {
        proto: {}, // Added prototype functions lists
        static: {}, // Added static values lists
        changed: ['Number','Boolean','String','BigInt','Function','Array','Object','Date','ImageData','Math'],
        totalAdds: undefined // Total proto/static adds
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
            throw Error('[EasyMod.js] 0: ' + varname + ' is not defined')
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
        // Set this to true if you want to use less memory (might lag more)
        compressed: false
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
    isMinimum: false,
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
    strict: {
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
    switchBases(input = '10', from = 10, to = 2) {
        var a = parseInt(input, from)
        return a.toString(to)
    },
    doc: {
        msePos: {x: 0, y: 0},
        lmsePos: {x: 0, y: 0},
        buttonClick(node, f=()=>{}) {
            if (node.localName != 'button') throw Error('[EasyMod.js] Element tag is not button')
            if (!(typeof f == 'function')) throw Error('[EasyMod.js] onclick needs to be an function')
            node.addEventListener('click', f)
        },
        setGetElementById(name='$') {
            this[name] = function (e) {
                return document.getElementById(e)
            }
        },
        canv: {
            canvasMsePos(node, objTarget) {
                if (node.localName != 'canvas') throw Error('[EasyMod.js] Element tag is not canvas')
                if (!typeof objTarget == 'object') throw Error('[EasyMod.js] Target needs to be an object')
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
                if (node.localName != 'canvas') throw Error('[EasyMod.js] Element tag is not canvas')
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
                if (node.localName != 'canvas') throw Error('[EasyMod.js] Element tag is not canvas')
                var ctx = node.getContext('2d');

                ctx.fillStyle = style
                ctx.strokeStyle = outstyle
                ctx.lineWidth = outwidth

                ctx.fillRect(x, y, w, h)
                if (outwidth) ctx.strokeRect(x, y, w, h)
            },
            circle(node, x=0, y=0, r=16, style='#000000', outwidth=0, outstyle='#222222') {
                if (node.localName != 'canvas') throw Error('[EasyMod.js] Element tag is not canvas')
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
            this.style.filter = `${name}(${value})`
        },
        setinner(target, innerHTML) {
            if (!(typeof target == 'object' & target.toString().includes('HTML'))) throw Error('[EasyMod.js] Target has to be an HTML element')
            target.innerHTML = innerHTML
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
            return `# ${id}\n${EasyObj.added.proto[id].length==0?'':'* '+EasyObj.added.proto[id].join(', ')+'\n'}${EasyObj.added.static[id].length==0?'':'* static: '+EasyObj.added.static[id].join(', ')+'\n'}`
        },
        full() {
            var a = '# Extra Methods and statics\n',
                b = EasyObj.toReadme.part
            EasyObj.added.proto.forEach((v,i)=>{
                a += b(i)
            })
            return a
        }
    }
}

// Method creating function (needed so all the variables in here are local)
;(function(){

    var add = EasyObj.added

    // Send new methods to types/functions
    function AddObj(target, proto, static, name) {
        Object.keys(proto).forEach(v=>{
            target.prototype[v] = proto[v]
            add.proto[target.name || name].push(v)
        })
        Object.keys(static).forEach(v=>{
            target[v] = static[v]
            add.static[target.name || name].push(v)
        })
    }

    // Start the prototype and static list
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
    P.eq = function (i) {
        return this == i
    }
    P.ex = function (i) {
        return this + 0 === i
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
    P.lfloor = function (i=10) {
        return this.logb(i).floor().bas(i)
    }
    P.lround = function (i=10) {
        return this.logb(i).round().bas(i)
    }
    P.lceil = function (i=10) {
        return this.logb(i).ceil().bas(i)
    }
    P.isInf = function () {
        return this == Infinity
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
    P.isalt = function (i=1) {
        return this.abs().lt(i)
    }
    P.dti = function () {
        var dec = this % 1
        while (dec % 1 != 0) {
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
    P.infs = function () {
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
    P.sfloor = function (step=1) {
        return this.div(step).floor().mul(step)
    }
    P.sround = function (step=1) {
        return this.div(step).round().mul(step)
    }
    P.sceil = function (step=1) {
        return this.div(step).ceil().mul(step)
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
    P.limz = function () {
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
    
    S.DIST = Math.log10(Number.MAX_SAFE_INTEGER)/Math.log10(Number.MAX_VALUE)
    
    AddObj(Number, P, S)
    P = {}, S = {}
    
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
    S.muland = (...i)=>{
        var r = true
        i.forEach(v => {
            r.and(v)
        })
        return r
    }
    S.mulor = (...i)=>{
        var r = false
        i.forEach(v => {
            r.or(v)
        })
        return r
    }
    
    AddObj(Boolean, P, S)
    P = {}, S = {}
    
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
        if (this.getlast() == 'n') {
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
    P.getlast = function () {
        return this[this.length - 1]
    }
    P.unstricteq = function (i) {
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
    P.repeatDec = function (amm) {
        var a = this.repeat(Number(amm + 1).limz())
        return a.substr(0, a.length - this.length * (1 - (amm % 1)))
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
    
    AddObj(String, P, S)
    P = {}, S = {}
    
    // BIGINT
    
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
        var a = Number(this)
        a = a.abs()
        return BigInt(a)
    }
    P.sign = function (i) {
        var a = Number(this)
        a = a.sign()
        return BigInt(a)
    }
    P.eq = function (i) {
        return this == i
    }
    P.ex = function (i) {
        return this + 0n === i
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
    
    AddObj(BigInt, P, S)
    P = {}, S = {}
    
    // FUNCTIONS
    
    P.iterate = function (t, i) {
       if (t == 0) {return i;}
       else {return this(this.iterate(t-1,i));}
    }
    
    P.getArgs = function () {
        var s=this.toString(),
            i=1,
            a='',
            p=0
        if (s[0]=='f') {
            var q = 1
            while (!(s[0]=='('|(s[0]==' '&q==0))) {
                s=s.slice(1)
                if (s[0]==' '&q==1) {
                    q=0
                    s=s.slice(1)
                }
            }
        }
        if (s[0]!='(') {
            i=0
            while (s[i]!='='|p!=0){
                a += s[i]
                if (s[i]=='(') p++
                if (s[i]==')') p--
                if (s[i]=='{') p++
                if (s[i]=='}') p--
                i++
            }
        } else {
            while (s[i]!=')'|p!=0){
                a += s[i]
                if (s[i]=='(') p++
                if (s[i]==')') p--
                i++
            }
        }
        a=a.split(',')
        a=a.map(v=>{
            var a = v.trimStart()
            a = a.replace(/(?<==).*/gm, '')
            if (a.includes('=')) a = a.slice(0, -1)
            return a
        })
        if (a.length==1&a[0]=='') {
            return []
        }
        return a
    }
    P.getArgsAll = function () {
        var s=this.toString(),
            i=1,
            a='',
            p=0
        if (s[0]=='f') {
            var q = 1
            while (!(s[0]=='('|(s[0]==' '&q==0))) {
                s=s.slice(1)
                if (s[0]==' '&q==1) {
                    q=0
                    s=s.slice(1)
                }
            }
        }
        if (s[0]!='(') {
            i=0
            while (s[i]!='='|p!=0){
                a += s[i]
                if (s[i]=='(') p++
                if (s[i]==')') p--
                if (s[i]=='{') p++
                if (s[i]=='}') p--
                i++
            }
        } else {
            while (s[i]!=')'|p!=0){
                a += s[i]
                if (s[i]=='(') p++
                if (s[i]==')') p--
                i++
            }
        }
        a=a.split(',')
        a=a.map(v=>{
            return v.trimStart()
        })
        if (a.length==1&a[0]=='') {
            return []
        }
        return a
    }
    P.getCommand = function () {
        var s=this.toString(),
            i=1,
            p=0
        if (s[0]=='f') {
            var q = 1
            while (!(s[0]=='('|(s[0]==' '&q==0))) {
                s=s.slice(1)
                if (s[0]==' '&q==1) {
                    q=0
                    s=s.slice(1)
                }
            }
        }
        if (s[0]!='(') {
            i=0
            while (s[i]!='='|p!=0){
                if (s[i]=='(') p++
                if (s[i]==')') p--
                if (s[i]=='{') p++
                if (s[i]=='}') p--
                i++
            }
        } else {
            while (s[i]!=')'|p!=0){
                if (s[i]=='(') p++
                if (s[i]==')') p--
                i++
            }
        }
        i+=s[0]=='('?(s[i+1]==' '?3:(s[i+1]=='{'?2:4)):3
        p=0
        var a=''
        while (s[i]!='}'|p!=0) {
            a += s[i]
            if (s[i]=='{') p++
            if (s[i]=='}') p--
            i++
        }
        return a
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
    P.iteration = function (start, length) {
        var out = [], n = start
        for (var i = 0; i < length; i++) {
            n = this(n, i, out)
            out.push(n)
        }
        return out
    }
    
    AddObj(Function, P, S)
    P = {}, S = {}
    
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
    P.onlyFirst = function () {
        var a = this
        return a.shift()
    }
    P.onlyLast = function () {
        var a = this
        return a.shift()
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
        `function ${name}(${args.join(',')}) {
            ${this.map(v=>{return '\t'+v}).join(';\n')}
        }`
        if (str) {
            return a
        } else {
            return new Function()
        }
    }
    P.toFunctArgs = function (name='anonymous', cmd, str=false) {
        var a = 
        `function ${name}(${this.join(',')}) {
            ${cmd}
        }`
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
    
    AddObj(Array, P, S)
    P = {}, S = {}
    
    // OBJECTS
    
    P.define = function (n, v) {
        this[n] = v
    }
    P.undefine = function (n) {
        delete this[n]
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
    P.propNames = function (str=false) {
        return str ? Object.keys(this) : keys(this)
    }
    P.stringify = function () {
        return JSON.stringify(this)
    }
    P.path = function (pathArray) {
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
    P.keyArray = function (stringOnly = false) {
        return (stringOnly ? Object.keys : keys)(this).map((key) => [key, this[key]]);
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
    P.keys = function () {
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
    
    // ANY
    
    P.switchType = function (type, isFunc, useNew=true) {
        if (isFunc) {
            if (self[type] == undefined) {
                throw Error('[EasyMod.js] 1: type is invalid')
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
            throw Error('[EasyMod.js] 1: type is invalid')
        }
    }
    P.getType = function () {
        return typeof this
    }
    P.truefy = function () {
        this.__proto__.shareChildren(this)
    }
    P.modify = function (funct) {
        return funct(this, typeof this)
    }
    P.isType = function (type) {
        return type == typeof this
    }
    P.toNumber = function () {
        return Number(this)
    }
    P.toBigInt = function () {
        return BigInt(this)
    }
    
    AddObj(Object, P, S)
    P = {}, S = {}
    
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
        var a = this.getMilliseconds()
        var b = this.getSeconds()
        var c = this.getMinutes()
        var d = this.getHours()
        var e = this.getAbsDay()
        var f = this.getFullYear()
        var out = []
        if ((a != 0 | b == 0) & hasMS) out.push(a + ' milliseconds')
        if (b != 0) out.push(b + ' seconds')
        if (c != 0) out.push(c + ' minutes')
        if (d != 0) out.push(d + ' hours')
        if (e != 0) out.push(e + ' days')
        if (f != 0) out.push(f + ' years')
        return out.join(', ')
    }
    
    AddObj(Date, P, S)
    P = {}, S = {}
    
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
    P.editpx = function (x, y, color, hasAlpha) {
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
    
    AddObj(ImageData, P, S)
    P = {}, S = {}
    
    // Math
    
    S.degrad = 360/(Math.PI*2)
    S.distance = (x, y) => {
        if (typeof x != 'object' | typeof y != 'object') throw Error('[EasyMod.js] Both X and Y values needs to be object or array')
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
    
    AddObj(Math, P, S, 'Math')
    
    // Detecting
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
        EasyObj.mouse.scr.y = e.deltaY
        y = EasyObj.mouse.scrs.y = EasyObj.mouse.scr.y.sign()
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

    var addm = 0
    add.proto.forEach((v)=>{
        addm += v.length
    })
    add.static.forEach((v)=>{
        addm += v.length
    })

    var time = Date.now()
    setInterval(()=>{
        EasyObj.time = Date.now() - time
    }, 10)

})() // 93.2% from 1k to 2k!    (if modding update this lol)
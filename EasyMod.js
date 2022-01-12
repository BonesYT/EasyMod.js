/* This is EasyMod.js
   By BonesYT (start: 19:48 03/01/2022 DD/MM/YYYY)
              (release: 11:58 04/01/2022 DD/MM/YYYY)
              (update: u2 14:57 04/01/2022 DD/MM/YYYY)
   EasyMod.js basically adds functions to strings, numbers, etc.
   Please don't copy! */

//NUMBERS

Number.prototype.add = function (i) {
    return this + i
}
Number.prototype.sub = function (i) {
    return this - i
}
Number.prototype.mul = function (i) {
    return this * i
}
Number.prototype.div = function (i) {
    return this / i
}
Number.prototype.pow = function (i) {
    return this ** i
}
Number.prototype.and = function (i) {
    return this & i
}
Number.prototype.or = function (i) {
    return this | i
}
Number.prototype.xor = function (i) {
    return this ^ i
}
Number.prototype.mod = function (i) {
    return this % i
}
Number.prototype.inv = function (i=1) {
    return i / this
}
Number.prototype.doub = function (i) {
    return this * 2
}
Number.prototype.half = function (i) {
    return this / 2
}
Number.prototype.trip = function (i) {
    return this * 3
}
Number.prototype.thir = function (i) {
    return this / 3
}
Number.prototype.sqr = function (i) {
    return this ** 2
}
Number.prototype.sqrt = function (i) {
    return this ** 0.5
}
Number.prototype.cb = function (i) {
    return this ** 3
}
Number.prototype.cbrt = function (i) {
    return this ** (1 / 3)
}
Number.prototype.bas = function (i) {
    return i ** this
}
Number.prototype.nrot = function (i) {
    return this ** (1 / i)
}
Number.prototype.neg = function (i=0) {
    return i - this
}
Number.prototype.log = function () {
    return Math.log(this)
}
Number.prototype.log10 = function () {
    return Math.log10(this)
}
Number.prototype.log2 = function () {
    return Math.log2(this)
}
Number.prototype.logb = function (i) {
    return Math.log(this) / Math.log(i)
}
Number.prototype.logbr = function (i) {
    return Math.log(i) / Math.log(this)
}
Number.prototype.floor = function (i=1) {
    return Math.floor(this/i)*i
}
Number.prototype.round = function (i=1) {
    return Math.round(this/i)*i
}
Number.prototype.ceil = function (i=1) {
    return Math.ceil(this/i)*i
}
Number.prototype.random = function (i=0) {
    return Math.random() * (this - i) + i
}
Number.prototype.clz32 = function () {
    return Math.clz32(this)
}
Number.prototype.max = function (...i) {
    i.unshift(this)
    return Math.max.apply(null, i)
}
Number.prototype.min = function (...i) {
    i.unshift(this)
    return Math.min.apply(null, i)
}
Number.prototype.sin = function () {
    return Math.sin(this)
}
Number.prototype.cos = function () {
    return Math.cos(this)
}
Number.prototype.tan = function () {
    return Math.tan(this)
}
Number.prototype.asin = function () {
    return Math.asin(this)
}
Number.prototype.acos = function () {
    return Math.acos(this)
}
Number.prototype.atan = function () {
    return Math.atan(this)
}
Number.prototype.atan2 = function () {
    return Math.atan2(this)
}
Number.prototype.sinh = function () {
    return Math.sinh(this)
}
Number.prototype.cosh = function () {
    return Math.cosh(this)
}
Number.prototype.tanh = function () {
    return Math.tanh(this)
}
Number.prototype.asinh = function () {
    return Math.asinh(this)
}
Number.prototype.acosh = function () {
    return Math.acosh(this)
}
Number.prototype.atanh = function () {
    return Math.atanh(this)
}
Number.prototype.sign = function () {
    return Math.sign(this)
}
Number.prototype.abs = function () {
    return Math.abs(this)
}
Number.prototype.trunc = function () {
    return Math.trunc(this)
}
Number.prototype.log1p = function () {
    return Math.log1p(this)
}
Number.prototype.fround = function () {
    return Math.fround(this)
}
Number.prototype.hypot = function (...i) {
    i.unshift(this)
    return Math.hypot.apply(null, i)
}
Number.prototype.imul = function (i) {
    return Math.imul(this, i)
}
Number.prototype.eq = function (i) {
    return this == i
}
Number.prototype.ex = function (i) {
    return this === i
}
Number.prototype.gt = function (i) {
    return this > i
}
Number.prototype.gte = function (i) {
    return this >= i
}
Number.prototype.lt = function (i) {
    return this < i
}
Number.prototype.lte = function (i) {
    return this <= i
}
Number.prototype.comp = function (i) {
    return (this-i).sign()
}
Number.prototype.isNaN = function () {
    return isNaN(this)
}
Number.prototype.bool = function () {
    return Boolean(this)
}
Number.prototype.lfloor = function (i=10) {
    this.logb(i).floor().bas(i)
}
Number.prototype.lround = function (i=10) {
    this.logb(i).round().bas(i)
}
Number.prototype.lceil = function (i=10) {
    this.logb(i).ceil().bas(i)
}
Number.prototype.isInf = function () {
    return this == Infinity
}
Number.prototype.isFin = function () {
    return this != Infinity
}
Number.prototype.isz = function () {
    return this == 0
}
Number.prototype.isPos = function (e) {
    return e ? this >= 0 : this > 0
}
Number.prototype.isNeg = function (e) {
    return e ? this <= 0 : this < 0
}
Number.prototype.isalt = function (i=1) {
    return this.abs().lt(i)
}
Number.prototype.dti = function () {
    var dec = this % 1
    while (dec % 1 != 0) {
        dec *= 10
    }
    return dec
}
Number.prototype.dtil = function () {
    return this.dti().log10().floor().add(1)
}
Number.prototype.array = function () {
    return [this]
}
Number.prototype.join = function (i) {
    if (this % 1 != 0 & i % 1 != 0) {
        i = i.dti().add(i.floor().mul(10**i.dtil()))
    }
    return String(this) + String(i)
}
Number.prototype.low = function (e=0) {
    var a = this.floor()
    var b = a % 1
    while (!(Math.floor(a % 10) != 0 | a < 10)) {
        a /= 10
    }
    return a + (e ? b : 0)
}
Number.prototype.infs = function () {
    return Math.log10(this)/Math.log10(Number.MAX_VALUE)
}
Number.prototype.toDate = function () {
    return new Date(this)
}
Number.prototype.toTimeStr = function (hasMS = false) {
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
Number.DIST = Math.log10(Number.MAX_SAFE_INTEGER)/Math.log10(Number.MAX_VALUE)

//BOOLEANS

Boolean.prototype.ifelse = function (i, e) {
    return this ? i : e
}
Boolean.prototype.sw = function () {
    return !this
}
Boolean.prototype.number = function () {
    return Number(this)
}
Boolean.prototype.and = function (i) {
    return Boolean(this & i)
}
Boolean.prototype.or = function (i) {
    return Boolean(this | i)
}
Boolean.prototype.xor = function (i) {
    return Boolean(this ^ i)
}
Boolean.muland = (...i)=>{
    var r = true
    i.forEach(v => {
        r.and(v)
    })
    return r
}
Boolean.mulor = (...i)=>{
    var r = false
    i.forEach(v => {
        r.or(v)
    })
    return r
}

//STRINGS

String.prototype.replaceAt = function(i, e) {
    return this.substr(0, i) + e + this.substr(i + e.length);
}
String.prototype.befj = function (...i) {
    i.push(this)
    i = i.join('')
    return i
}
String.prototype.html = function (i, attr) {
    return `<${i}${attr==undefined?'':' '+attr}>${this}</${i}>`
}
String.prototype.html2 = function (i, attr) {
    return `<${this}${attr==undefined?'':' '+attr}>${i}</${this}>`
}
String.prototype.reverse = function () {
    var a = this
    a = a.split('')
    a.reverse()
    return a.join('')
}
String.prototype.del = function (rx) {
    return this.replace(rx, '')
}
String.prototype.fitEnd = function (l, f='') {
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
String.prototype.fitStart = function (l, f='') {
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
String.prototype.loopIncludes = function (i, a=2) {
    return this.repeat(a).includes(i)
}
String.prototype.heading = function (i, id='', Class='') {
    i = Number(i||1).min(6).max(1).floor()
    return `<h${i}${id==''?'':` id="${id}"`}${Class==''?'':` class="${Class}"`}>${this}</h${i}>`
}
String.prototype.change = function (i) {
    var a = this
    for (var b = 0; b < a.length; b++) {
        a = a.replaceAt(b, i[b % i.length])
    }
    return a
}
String.prototype.toClipboard = function () {
    var el = document.createElement('textarea')
    el.value = this
    el.setAttribute('readonly', '')
    el.style = {position: 'absolute', left: '-9999px'}
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}
String.prototype.func = function (isEval) {
    return isEval ? eval(this) : new Function(this)
}
String.prototype.autoCase = function () {
    var a = this.split(' ')
    a = a.map(v => {
        return v.replaceAt(0, v[0].toUpperCase())
    })
    return a.join(' ')
}
String.prototype.argSplit = function (by, strStart, strEnd, inStr) {
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

//BIGINT

BigInt.prototype.number = function () {
    return Number(this)
}
BigInt.prototype.add = function (i) {
    return this + BigInt(i)
}
BigInt.prototype.sub = function (i) {
    return this - BigInt(i)
}
BigInt.prototype.mul = function (i) {
    return this * BigInt(i)
}
BigInt.prototype.div = function (i) {
    return this / BigInt(i)
}
BigInt.prototype.pow = function (i) {
    return this ** BigInt(i)
}
BigInt.prototype.bas = function (i) {
    return BigInt(i) ** this
}
BigInt.prototype.neg = function (i) {
    return BigInt(i) - this
}
BigInt.prototype.abs = function (i) {
    var a = Number(this)
    a = a.abs()
    return BigInt(a)
}
BigInt.prototype.sign = function (i) {
    var a = Number(this)
    a = a.sign()
    return BigInt(a)
}
BigInt.prototype.eq = function (i) {
    return this == i
}
BigInt.prototype.ex = function (i) {
    return this === i
}
BigInt.prototype.gt = function (i) {
    return this > i
}
BigInt.prototype.gte = function (i) {
    return this >= i
}
BigInt.prototype.lt = function (i) {
    return this < i
}
BigInt.prototype.lte = function (i) {
    return this <= i
}
BigInt.prototype.isz = function (i) {
    return this === 0n
}
BigInt.prototype.isPos = function (e) {
    return e ? this >= 0 : this > 0
}
BigInt.prototype.isNeg = function (e) {
    return e ? this <= 0 : this < 0
}
BigInt.prototype.comp = function (i) {
    return (this-BigInt(i)).sign()
}

//FUNCTIONS

Function.prototype.getArgs = function () {
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
Function.prototype.getArgsAll = function () {
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
Function.prototype.getCommand = function () {
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
Function.prototype.addLine = function (...i) {
    var a = this.getCommand()
    a = a.concat.apply(a, i)
    a = a.join('\n')
    return a.func()
}

//ARRAYS

Array.prototype.befj = function (...i) {
    i.push.apply(i, this)
    return i
}
Array.prototype.fitEnd = function (l, f='', min) {
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
Array.prototype.fitStart = function (l, f='', min) {
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
Array.prototype.valueMap = function (f) {
    var func = (i)=>{
        keys(i).forEach((v,ip)=>{
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
Array.prototype.sum = function () {
    return this.reduce((p,c)=>{
        return p + c
    }, 0)
}
Array.prototype.prod = function () {
    return this.reduce((p,c)=>{
        return p * c
    }, 1)
}
Array.prototype.onlyFirst = function () {
    var a = this
    return a.shift()
}
Array.prototype.onlyLast = function () {
    var a = this
    return a.shift()
}
Array.prototype.gate = function () {
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
Array.prototype.onlyAllow = function (...i) {
    var a = []
    i.forEach(v=>{
        a.push(this[v])
    })
    return a
}

//OBJECTS

Object.prototype.define = function (n, v) {
    this[n] = v
}
Object.prototype.undefine = function (n) {
    delete this[n]
}
Object.prototype.get = function (n) {
    return this[n]
}
Object.prototype.valueMap = function (f) {
    var func = (i)=>{
        keys(i).forEach((v,ip)=>{
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
Object.prototype.gate = function () {
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
Object.prototype.onlyAllow = function (...i) {
    var a = {}
    i.forEach(v=>{
        a[v] = this[v]
    })
    return a
}
Object.prototype.propNames = function (str=false) {
    return str ? Object.keys(this) : keys(this)
}

//ANY

Object.prototype.switchType = function (type, isFunc, useNew=true) {
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

//DATE

Date.prototype.since = function (t) {
    t = new Date(t)
    return this.getTime() - t.getTime()
}
Date.prototype.daysSinceYear = function (t) {
    return (this.getTime() - new Date('year ' + t).getTime()) / 8.64e7
}

var EasyObj = {
    define: (n, v)=>{
        this[n] = v
    },
    undefine: (n)=>{
        delete this[n]
    },
    isDefined: (n)=>{
        return this[n] != undefined
    },
    get: (n)=>{
        return this[n]
    },
    createMethod: (target, name, func)=>{
        this[target].prototype[name] = func
    },
    isConst: (varname)=>{
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
}
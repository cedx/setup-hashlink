(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
class EReg {
	constructor(r,opt) {
		this.r = new RegExp(r,opt.split("u").join(""));
	}
	match(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	matched(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) {
			return this.r.m[n];
		} else {
			throw haxe_Exception.thrown("EReg::matched");
		}
	}
}
EReg.__name__ = true;
class HxOverrides {
	static cca(s,index) {
		let x = s.charCodeAt(index);
		if(x != x) {
			return undefined;
		}
		return x;
	}
	static substr(s,pos,len) {
		if(len == null) {
			len = s.length;
		} else if(len < 0) {
			if(pos == 0) {
				len = s.length + len;
			} else {
				return "";
			}
		}
		return s.substr(pos,len);
	}
	static now() {
		return Date.now();
	}
}
HxOverrides.__name__ = true;
class IntIterator {
	constructor(min,max) {
		this.min = min;
		this.max = max;
	}
	hasNext() {
		return this.min < this.max;
	}
	next() {
		return this.min++;
	}
}
IntIterator.__name__ = true;
class Lambda {
	static iter(it,f) {
		let x = $getIterator(it);
		while(x.hasNext()) f(x.next());
	}
}
Lambda.__name__ = true;
Math.__name__ = true;
class Reflect {
	static field(o,field) {
		try {
			return o[field];
		} catch( _g ) {
			return null;
		}
	}
	static fields(o) {
		let a = [];
		if(o != null) {
			let hasOwnProperty = Object.prototype.hasOwnProperty;
			for( var f in o ) {
			if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
				a.push(f);
			}
			}
		}
		return a;
	}
	static copy(o) {
		if(o == null) {
			return null;
		}
		let o2 = { };
		let _g = 0;
		let _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			let f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
		return o2;
	}
}
Reflect.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
	static parseInt(x) {
		if(x != null) {
			let _g = 0;
			let _g1 = x.length;
			while(_g < _g1) {
				let i = _g++;
				let c = x.charCodeAt(i);
				if(c <= 8 || c >= 14 && c != 32 && c != 45) {
					let nc = x.charCodeAt(i + 1);
					let v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
					if(isNaN(v)) {
						return null;
					} else {
						return v;
					}
				}
			}
		}
		return null;
	}
}
Std.__name__ = true;
class StringTools {
	static isSpace(s,pos) {
		let c = HxOverrides.cca(s,pos);
		if(!(c > 8 && c < 14)) {
			return c == 32;
		} else {
			return true;
		}
	}
	static ltrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,r)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,r,l - r);
		} else {
			return s;
		}
	}
	static rtrim(s) {
		let l = s.length;
		let r = 0;
		while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
		if(r > 0) {
			return HxOverrides.substr(s,0,l - r);
		} else {
			return s;
		}
	}
	static trim(s) {
		return StringTools.ltrim(StringTools.rtrim(s));
	}
	static replace(s,sub,by) {
		return s.split(sub).join(by);
	}
	static hex(n,digits) {
		let s = "";
		while(true) {
			s = "0123456789ABCDEF".charAt(n & 15) + s;
			n >>>= 4;
			if(!(n > 0)) {
				break;
			}
		}
		if(digits != null) {
			while(s.length < digits) s = "0" + s;
		}
		return s;
	}
}
StringTools.__name__ = true;
class Sys {
	static systemName() {
		let _g = process.platform;
		switch(_g) {
		case "darwin":
			return "Mac";
		case "freebsd":
			return "BSD";
		case "linux":
			return "Linux";
		case "win32":
			return "Windows";
		default:
			return _g;
		}
	}
}
Sys.__name__ = true;
class coconut_data_helpers_Annex {
	constructor(target) {
		this.target = target;
		this.registry = new haxe_ds_ObjectMap();
	}
}
coconut_data_helpers_Annex.__name__ = true;
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:true,__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
class haxe_Exception extends Error {
	constructor(message,previous,native) {
		super(message);
		this.message = message;
		this.__previousException = previous;
		this.__nativeException = native != null ? native : this;
	}
	unwrap() {
		return this.__nativeException;
	}
	get_native() {
		return this.__nativeException;
	}
	static caught(value) {
		if(((value) instanceof haxe_Exception)) {
			return value;
		} else if(((value) instanceof Error)) {
			return new haxe_Exception(value.message,null,value);
		} else {
			return new haxe_ValueException(value,null,value);
		}
	}
	static thrown(value) {
		if(((value) instanceof haxe_Exception)) {
			return value.get_native();
		} else if(((value) instanceof Error)) {
			return value;
		} else {
			let e = new haxe_ValueException(value);
			return e;
		}
	}
}
haxe_Exception.__name__ = true;
class haxe_Resource {
	static getString(name) {
		let _g = 0;
		let _g1 = haxe_Resource.content;
		while(_g < _g1.length) {
			let x = _g1[_g];
			++_g;
			if(x.name == name) {
				if(x.str != null) {
					return x.str;
				}
				return haxe_crypto_Base64.decode(x.data).toString();
			}
		}
		return null;
	}
}
haxe_Resource.__name__ = true;
class haxe_ValueException extends haxe_Exception {
	constructor(value,previous,native) {
		super(String(value),previous,native);
		this.value = value;
	}
	unwrap() {
		return this.value;
	}
}
haxe_ValueException.__name__ = true;
class haxe_io_Bytes {
	constructor(data) {
		this.length = data.byteLength;
		this.b = new Uint8Array(data);
		this.b.bufferValue = data;
		data.hxBytes = this;
		data.bytes = this.b;
	}
	getString(pos,len,encoding) {
		if(pos < 0 || len < 0 || pos + len > this.length) {
			throw haxe_Exception.thrown(haxe_io_Error.OutsideBounds);
		}
		if(encoding == null) {
			encoding = haxe_io_Encoding.UTF8;
		}
		let s = "";
		let b = this.b;
		let i = pos;
		let max = pos + len;
		switch(encoding._hx_index) {
		case 0:
			while(i < max) {
				let c = b[i++];
				if(c < 128) {
					if(c == 0) {
						break;
					}
					s += String.fromCodePoint(c);
				} else if(c < 224) {
					let code = (c & 63) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else if(c < 240) {
					let code = (c & 31) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(code);
				} else {
					let u = (c & 15) << 18 | (b[i++] & 127) << 12 | (b[i++] & 127) << 6 | b[i++] & 127;
					s += String.fromCodePoint(u);
				}
			}
			break;
		case 1:
			while(i < max) {
				let c = b[i++] | b[i++] << 8;
				s += String.fromCodePoint(c);
			}
			break;
		}
		return s;
	}
	toString() {
		return this.getString(0,this.length);
	}
	static ofString(s,encoding) {
		if(encoding == haxe_io_Encoding.RawNative) {
			let buf = new Uint8Array(s.length << 1);
			let _g = 0;
			let _g1 = s.length;
			while(_g < _g1) {
				let i = _g++;
				let c = s.charCodeAt(i);
				buf[i << 1] = c & 255;
				buf[i << 1 | 1] = c >> 8;
			}
			return new haxe_io_Bytes(buf.buffer);
		}
		let a = [];
		let i = 0;
		while(i < s.length) {
			let c = s.charCodeAt(i++);
			if(55296 <= c && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(i++) & 1023;
			}
			if(c <= 127) {
				a.push(c);
			} else if(c <= 2047) {
				a.push(192 | c >> 6);
				a.push(128 | c & 63);
			} else if(c <= 65535) {
				a.push(224 | c >> 12);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			} else {
				a.push(240 | c >> 18);
				a.push(128 | c >> 12 & 63);
				a.push(128 | c >> 6 & 63);
				a.push(128 | c & 63);
			}
		}
		return new haxe_io_Bytes(new Uint8Array(a).buffer);
	}
}
haxe_io_Bytes.__name__ = true;
var haxe_io_Encoding = $hxEnums["haxe.io.Encoding"] = { __ename__:true,__constructs__:null
	,UTF8: {_hx_name:"UTF8",_hx_index:0,__enum__:"haxe.io.Encoding",toString:$estr}
	,RawNative: {_hx_name:"RawNative",_hx_index:1,__enum__:"haxe.io.Encoding",toString:$estr}
};
haxe_io_Encoding.__constructs__ = [haxe_io_Encoding.UTF8,haxe_io_Encoding.RawNative];
class haxe_crypto_Base64 {
	static decode(str,complement) {
		if(complement == null) {
			complement = true;
		}
		if(complement) {
			while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
		}
		return new haxe_crypto_BaseCode(haxe_crypto_Base64.BYTES).decodeBytes(haxe_io_Bytes.ofString(str));
	}
}
haxe_crypto_Base64.__name__ = true;
class haxe_crypto_BaseCode {
	constructor(base) {
		let len = base.length;
		let nbits = 1;
		while(len > 1 << nbits) ++nbits;
		if(nbits > 8 || len != 1 << nbits) {
			throw haxe_Exception.thrown("BaseCode : base length must be a power of two.");
		}
		this.base = base;
		this.nbits = nbits;
	}
	initTable() {
		let tbl = [];
		let _g = 0;
		while(_g < 256) tbl[_g++] = -1;
		let _g1 = 0;
		let _g2 = this.base.length;
		while(_g1 < _g2) {
			let i = _g1++;
			tbl[this.base.b[i]] = i;
		}
		this.tbl = tbl;
	}
	decodeBytes(b) {
		let nbits = this.nbits;
		if(this.tbl == null) {
			this.initTable();
		}
		let tbl = this.tbl;
		let size = b.length * nbits >> 3;
		let out = new haxe_io_Bytes(new ArrayBuffer(size));
		let buf = 0;
		let curbits = 0;
		let pin = 0;
		let pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				let i = tbl[b.b[pin++]];
				if(i == -1) {
					throw haxe_Exception.thrown("BaseCode : invalid encoded char");
				}
				buf |= i;
			}
			curbits -= 8;
			out.b[pout++] = buf >> curbits & 255;
		}
		return out;
	}
}
haxe_crypto_BaseCode.__name__ = true;
class haxe_ds_ObjectMap {
	constructor() {
		this.h = { __keys__ : { }};
	}
}
haxe_ds_ObjectMap.__name__ = true;
var haxe_ds_Option = $hxEnums["haxe.ds.Option"] = { __ename__:true,__constructs__:null
	,Some: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"haxe.ds.Option",toString:$estr}; },$_._hx_name="Some",$_.__params__ = ["v"],$_)
	,None: {_hx_name:"None",_hx_index:1,__enum__:"haxe.ds.Option",toString:$estr}
};
haxe_ds_Option.__constructs__ = [haxe_ds_Option.Some,haxe_ds_Option.None];
var haxe_io_Error = $hxEnums["haxe.io.Error"] = { __ename__:true,__constructs__:null
	,Blocked: {_hx_name:"Blocked",_hx_index:0,__enum__:"haxe.io.Error",toString:$estr}
	,Overflow: {_hx_name:"Overflow",_hx_index:1,__enum__:"haxe.io.Error",toString:$estr}
	,OutsideBounds: {_hx_name:"OutsideBounds",_hx_index:2,__enum__:"haxe.io.Error",toString:$estr}
	,Custom: ($_=function(e) { return {_hx_index:3,e:e,__enum__:"haxe.io.Error",toString:$estr}; },$_._hx_name="Custom",$_.__params__ = ["e"],$_)
};
haxe_io_Error.__constructs__ = [haxe_io_Error.Blocked,haxe_io_Error.Overflow,haxe_io_Error.OutsideBounds,haxe_io_Error.Custom];
class haxe_io_Path {
	static join(paths) {
		let _g = [];
		let _g1 = 0;
		while(_g1 < paths.length) {
			let v = paths[_g1];
			++_g1;
			if(v != null && v != "") {
				_g.push(v);
			}
		}
		if(_g.length == 0) {
			return "";
		}
		let path = _g[0];
		let _g2 = 1;
		let _g3 = _g.length;
		while(_g2 < _g3) {
			path = haxe_io_Path.addTrailingSlash(path);
			path += _g[_g2++];
		}
		return haxe_io_Path.normalize(path);
	}
	static normalize(path) {
		let slash = "/";
		path = path.split("\\").join(slash);
		if(path == slash) {
			return slash;
		}
		let target = [];
		let _g = 0;
		let _g1 = path.split(slash);
		while(_g < _g1.length) {
			let token = _g1[_g];
			++_g;
			if(token == ".." && target.length > 0 && target[target.length - 1] != "..") {
				target.pop();
			} else if(token == "") {
				if(target.length > 0 || HxOverrides.cca(path,0) == 47) {
					target.push(token);
				}
			} else if(token != ".") {
				target.push(token);
			}
		}
		let acc_b = "";
		let colon = false;
		let slashes = false;
		let _g2_offset = 0;
		let _g2_s = target.join(slash);
		while(_g2_offset < _g2_s.length) {
			let s = _g2_s;
			let index = _g2_offset++;
			let c = s.charCodeAt(index);
			if(c >= 55296 && c <= 56319) {
				c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
			}
			let c1 = c;
			if(c1 >= 65536) {
				++_g2_offset;
			}
			let c2 = c1;
			switch(c2) {
			case 47:
				if(!colon) {
					slashes = true;
				} else {
					let i = c2;
					colon = false;
					if(slashes) {
						acc_b += "/";
						slashes = false;
					}
					acc_b += String.fromCodePoint(i);
				}
				break;
			case 58:
				acc_b += ":";
				colon = true;
				break;
			default:
				let i = c2;
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				acc_b += String.fromCodePoint(i);
			}
		}
		return acc_b;
	}
	static addTrailingSlash(path) {
		if(path.length == 0) {
			return "/";
		}
		let c1 = path.lastIndexOf("/");
		let c2 = path.lastIndexOf("\\");
		if(c1 < c2) {
			if(c2 != path.length - 1) {
				return path + "\\";
			} else {
				return path;
			}
		} else if(c1 != path.length - 1) {
			return path + "/";
		} else {
			return path;
		}
	}
}
haxe_io_Path.__name__ = true;
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true;
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(o.__enum__) {
				let e = $hxEnums[o.__enum__];
				let con = e.__constructs__[o._hx_index];
				let n = con._hx_name;
				if(con.__params__) {
					s = s + "\t";
					return n + "(" + ((function($this) {
						var $r;
						let _g = [];
						{
							let _g1 = 0;
							let _g2 = con.__params__;
							while(true) {
								if(!(_g1 < _g2.length)) {
									break;
								}
								let p = _g2[_g1];
								_g1 = _g1 + 1;
								_g.push(js_Boot.__string_rec(o[p],s));
							}
						}
						$r = _g;
						return $r;
					}(this))).join(",") + ")";
				} else {
					return n;
				}
			}
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true;
var js_actions_Core = require("@actions/core");
var js_actions_ToolCache = require("@actions/tool-cache");
var js_node_ChildProcess = require("child_process");
var js_node_Fs = require("fs");
class setup_$hashlink_PathTools {
	static normalizeSeparator(path) {
		if(Sys.systemName() == "Windows") {
			return StringTools.replace(path,"/","\\");
		} else {
			return path;
		}
	}
}
setup_$hashlink_PathTools.__name__ = true;
function setup_$hashlink_Program_main() {
	let version = js_actions_Core.getInput("version");
	let _g;
	if(version.length == 0 || version == "latest") {
		let o = tink_pure_List.first(setup_$hashlink_Release.data);
		let _this;
		if(o._hx_index == 0) {
			_this = o.v;
		} else {
			throw haxe_Exception.thrown(new tink_core_TypedError(404,"Some value expected but none found",{ fileName : "src/setup_hashlink/Release.hx", lineNumber : 49, className : "setup_hashlink.Release", methodName : "get_latest"}));
		}
		_g = _this.version;
	} else {
		_g = version;
	}
	let _g1 = tink_semver_Version.parse(_g);
	switch(_g1._hx_index) {
	case 0:
		let version1 = _g1.data.toString();
		let _g2 = tink_pure_List.first(setup_$hashlink_Release.data,function(release) {
			return release.version == version1;
		});
		switch(_g2._hx_index) {
		case 0:
			new setup_$hashlink_Setup(_g2.v).install().handle(function(outcome) {
				switch(outcome._hx_index) {
				case 0:
					js_actions_Core.info("HashLink VM successfully installed.");
					break;
				case 1:
					js_actions_Core.setFailed(outcome.failure.message);
					break;
				}
			});
			break;
		case 1:
			js_actions_Core.setFailed("No release corresponding to version " + version + ".");
			break;
		}
		break;
	case 1:
		js_actions_Core.setFailed("Invalid version constraint: " + version);
		break;
	}
}
class tink_Url {
	static resolve(this1,that) {
		if(that.scheme != null) {
			return that;
		} else if(that.hosts[0] != null) {
			if(that.scheme != null) {
				return that;
			} else {
				let copy = Reflect.copy(that);
				copy.scheme = this1.scheme;
				return copy;
			}
		} else {
			let parts = { path : tink_url_Path.join(this1.path,that.path), payload : "", scheme : this1.scheme, query : that.query, auth : this1.auth, hosts : this1.hosts, hash : that.hash};
			tink_Url.makePayload(parts);
			return parts;
		}
	}
	static makePayload(parts) {
		let payload = "";
		let _g = parts.auth;
		let _g1 = parts.hosts;
		if(_g == null) {
			if(_g1.length != 0) {
				payload = "" + ("//" + _g1.join(","));
			}
		} else if(_g1.length == 0) {
			payload = "" + ("//" + (_g == null ? "null" : _g == null ? "" : "" + _g + "@"));
		} else {
			payload = "" + ("//" + (_g == null ? "null" : _g == null ? "" : "" + _g + "@") + _g1.join(","));
		}
		payload += parts.path == null ? "null" : parts.path;
		let _g2 = parts.query;
		if(_g2 != null) {
			payload += "?" + (_g2 == null ? "null" : _g2);
		}
		let _g3 = parts.hash;
		if(_g3 != null) {
			payload += "#" + _g3;
		}
		parts.payload = payload.toString();
	}
	static toString(this1) {
		if(this1.scheme == null) {
			return this1.payload;
		} else {
			return "" + this1.scheme + ":" + this1.payload;
		}
	}
	static fromString(s) {
		return tink_Url.parse(s);
	}
	static noop(_) {
	}
	static parse(s,onError) {
		while(true) {
			if(s == null) {
				s = "";
				onError = null;
				continue;
			}
			if(onError == null) {
				onError = tink_Url.noop;
			}
			s = StringTools.trim(s);
			if(s.startsWith("data:")) {
				return { scheme : "data", payload : HxOverrides.substr(s,5,null), hosts : []};
			}
			let FORMAT = new EReg("^(([a-zA-Z][a-zA-Z0-9\\-+.]*):)?((//(([^@/]+)@)?([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?)$","");
			let HOST = new EReg("^(\\[(.*)\\]|([^:]*))(:(.*))?$","");
			FORMAT.match(s);
			let hosts;
			let _g = FORMAT.matched(7);
			if(_g == null) {
				hosts = [];
			} else {
				let _g1 = [];
				let _g2 = 0;
				let _g3 = _g.split(",");
				while(_g2 < _g3.length) {
					let host = _g3[_g2];
					++_g2;
					HOST.match(host);
					let host1;
					let _g = HOST.matched(3);
					let _g4 = HOST.matched(2);
					if(_g4 == null) {
						host1 = _g;
					} else if(_g == null) {
						host1 = "[" + _g4 + "]";
					} else {
						onError("invalid host " + host);
						host1 = null;
					}
					let port;
					let _g5 = HOST.matched(5);
					if(_g5 == null) {
						port = null;
					} else {
						let _g = Std.parseInt(_g5);
						if(_g == null) {
							onError("invalid port " + _g5);
							port = null;
						} else {
							port = _g;
						}
					}
					_g1.push(tink_url_Host._new(host1,port));
				}
				hosts = _g1;
			}
			let path = FORMAT.matched(8);
			if(hosts.length > 0 && path.charAt(0) != "/") {
				path = "/" + path;
			}
			return { scheme : FORMAT.matched(2), payload : FORMAT.matched(3), hosts : hosts, auth : FORMAT.matched(6), path : tink_url_Path.ofString(path), query : FORMAT.matched(10), hash : FORMAT.matched(12)};
		}
	}
}
class tink_url_Host {
	static _new(name,port) {
		let this1;
		if(port == null) {
			this1 = name;
		} else if(port > 65535 || port <= 0) {
			throw haxe_Exception.thrown("Invalid port");
		} else {
			this1 = "" + name + ":" + port;
		}
		return this1;
	}
}
class tink_url_Path {
	static join(this1,that) {
		if(that == "") {
			return this1;
		} else if(that.charAt(0) == "/") {
			return that;
		} else if(this1.charAt(this1.length - 1) == "/") {
			return tink_url_Path.ofString(this1 + that);
		} else {
			let _g = this1.lastIndexOf("/");
			if(_g == -1) {
				return that;
			} else {
				return tink_url_Path.ofString(HxOverrides.substr(this1,0,_g + 1) + (that == null ? "null" : that));
			}
		}
	}
	static ofString(s) {
		return tink_url_Path.normalize(s);
	}
	static normalize(s) {
		s = StringTools.trim(StringTools.replace(s,"\\","/"));
		if(s == ".") {
			return "./";
		}
		let isDir = s.endsWith("/..") || s.endsWith("/") || s.endsWith("/.");
		let parts = [];
		let isAbsolute = s.startsWith("/");
		let up = 0;
		let _g = 0;
		let _g1 = s.split("/");
		while(_g < _g1.length) {
			let _g2 = StringTools.trim(_g1[_g++]);
			switch(_g2) {
			case "":
				break;
			case ".":
				break;
			case "..":
				if(parts.pop() == null) {
					++up;
				}
				break;
			default:
				parts.push(_g2);
			}
		}
		if(isAbsolute) {
			parts.unshift("");
		} else {
			let _g = 0;
			let _g1 = up;
			while(_g < _g1) {
				++_g;
				parts.unshift("..");
			}
		}
		if(isDir) {
			parts.push("");
		}
		return parts.join("/");
	}
}
class tink_pure_List {
	static first(this1,predicate) {
		let _g = new tink_pure_NodeIterator(this1);
		while(_g.list.length > 0) {
			let x = _g.next();
			if(predicate == null || predicate(x)) {
				return haxe_ds_Option.Some(x);
			}
		}
		return haxe_ds_Option.None;
	}
	static fromArray(i) {
		let ret = null;
		let len = 0;
		let pos = i.length;
		while(pos-- > 0) ret = new tink_pure__$List_Node(++len,i[pos],ret == null ? tink_pure__$List_Node.EMPTY : [ret]);
		return ret;
	}
}
class tink_pure__$List_Node {
	constructor(length,value,tails) {
		this.value = value;
		this.length = length;
		this.tails = tails == null ? tink_pure__$List_Node.EMPTY : tails;
	}
}
tink_pure__$List_Node.__name__ = true;
class tink_json_BasicParser {
	constructor() {
		this.afterParsing = [];
		this.plugins = new tink_core_Annex(this);
	}
	init(source) {
		this.pos = 0;
		this.max = source.length;
		this.source = source;
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
	}
	parseString() {
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let e;
		if(this.source.charCodeAt(this.pos) == 34) {
			this.pos += 1;
			e = true;
		} else {
			e = false;
		}
		if(!e) {
			this.die("Expected " + "string");
		}
		return this.parseRestOfString();
	}
	parseRestOfString() {
		return this.slice(this.skipString(),this.pos - 1);
	}
	skipString() {
		let start = this.pos;
		while(true) {
			let _g = this.source.indexOf(tink_json_BasicParser.DBQT,this.pos);
			if(_g == -1) {
				this.die("unterminated string",start);
			} else {
				this.pos = _g + 1;
				let p = this.pos - 2;
				while(this.source.charCodeAt(p) == 92) --p;
				if((p - this.pos & 1) == 0) {
					break;
				}
			}
		}
		return start;
	}
	invalidNumber(start) {
		return this.die("Invalid number " + this.source.substring(start,this.pos),start);
	}
	skipNumber(c) {
		let start = this.pos - 1;
		let minus = c == 45;
		let digit = !minus;
		let zero = c == 48;
		let point = false;
		let e = false;
		let pm = false;
		let end = false;
		while(this.pos < this.max) {
			c = this.source.charCodeAt(this.pos++);
			switch(c) {
			case 43:case 45:
				if(!e || pm) {
					this.invalidNumber(start);
				}
				digit = false;
				pm = true;
				break;
			case 46:
				if(minus || point) {
					this.invalidNumber(start);
				}
				digit = false;
				point = true;
				break;
			case 48:
				if(zero && !point) {
					this.invalidNumber(start);
				}
				if(minus) {
					minus = false;
					zero = true;
				}
				digit = true;
				break;
			case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				if(zero && !point) {
					this.invalidNumber(start);
				}
				if(minus) {
					minus = false;
				}
				digit = true;
				zero = false;
				break;
			case 69:case 101:
				if(minus || zero || e) {
					this.invalidNumber(start);
				}
				digit = false;
				e = true;
				break;
			default:
				if(!digit) {
					this.invalidNumber(start);
				}
				this.pos--;
				end = true;
			}
			if(end) {
				break;
			}
		}
		return start;
	}
	slice(from,to) {
		return this.source.substring(from,to);
	}
	skipArray() {
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp;
		if(this.source.charCodeAt(this.pos) == 93) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(tmp) {
			return;
		}
		while(true) {
			this.skipValue();
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp;
			if(this.source.charCodeAt(this.pos) == 44) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				break;
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp1;
		if(this.source.charCodeAt(this.pos) == 93) {
			this.pos += 1;
			tmp1 = true;
		} else {
			tmp1 = false;
		}
		if(!tmp1) {
			this.die("Expected " + "]");
		}
	}
	skipValue() {
		let _g = this.source.charCodeAt(this.pos++);
		switch(_g) {
		case 34:
			this.skipString();
			break;
		case 91:
			this.skipArray();
			break;
		case 102:
			let tmp;
			if(this.source.charCodeAt(this.pos) == 97 && this.source.charCodeAt(this.pos + 1) == 108 && this.source.charCodeAt(this.pos + 2) == 115 && this.source.charCodeAt(this.pos + 3) == 101) {
				this.pos += 4;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "alse");
			}
			break;
		case 110:
			let tmp1;
			if(this.source.charCodeAt(this.pos) == 117 && this.source.charCodeAt(this.pos + 1) == 108 && this.source.charCodeAt(this.pos + 2) == 108) {
				this.pos += 3;
				tmp1 = true;
			} else {
				tmp1 = false;
			}
			if(!tmp1) {
				this.die("Expected " + "ull");
			}
			break;
		case 116:
			let tmp2;
			if(this.source.charCodeAt(this.pos) == 114 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 101) {
				this.pos += 3;
				tmp2 = true;
			} else {
				tmp2 = false;
			}
			if(!tmp2) {
				this.die("Expected " + "rue");
			}
			break;
		case 123:
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp3;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp3 = true;
			} else {
				tmp3 = false;
			}
			if(tmp3) {
				return;
			}
			while(true) {
				if(this.source.charCodeAt(this.pos++) != 34) {
					this.die("expected string",this.pos - 1);
				}
				this.skipString();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				let tmp;
				if(this.source.charCodeAt(this.pos) == 58) {
					this.pos += 1;
					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
					tmp = true;
				} else {
					tmp = false;
				}
				if(!tmp) {
					this.die("Expected " + ":");
				}
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				let tmp1;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
					tmp1 = true;
				} else {
					tmp1 = false;
				}
				if(!tmp1) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp4;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				tmp4 = true;
			} else {
				tmp4 = false;
			}
			if(!tmp4) {
				this.die("Expected " + "}");
			}
			break;
		default:
			if(_g == 46 || _g == 45 || _g < 58 && _g > 47) {
				this.skipNumber(_g);
			} else {
				this.invalidChar(_g);
			}
		}
	}
	invalidChar(c) {
		return this.die("invalid char " + StringTools.hex(c,2),this.pos - 1);
	}
	die(s,pos,end) {
		if(end == null) {
			end = -1;
		}
		if(pos == null) {
			pos = -1;
		}
		if(pos == -1) {
			pos = this.pos;
			end = pos;
		} else if(end == -1) {
			end = this.pos;
		}
		if(end <= pos) {
			end = pos + 1;
		}
		let clip = function(s,maxLength,left) {
			if(s.length > maxLength) {
				if(left) {
					return "... " + HxOverrides.substr(s,s.length - maxLength,null);
				} else {
					return HxOverrides.substr(s,0,maxLength) + " ...";
				}
			} else {
				return s;
			}
		};
		let center = pos + end >> 1;
		return tink_core_TypedError.withData(422,s + (" at " + (end > pos + 1 ? "characters " + pos + " - " + end : "character " + pos) + " in " + (clip(this.source.substring(0,pos),20,true) + "  ---->  " + clip(this.source.substring(pos,center),20,false) + clip(this.source.substring(center,end),20,true) + "  <----  " + clip(this.source.substring(end,this.max),20,false))),{ source : this.source, start : pos, end : end},{ fileName : "tink/json/Parser.hx", lineNumber : 472, className : "tink.json.BasicParser", methodName : "die"}).throwSelf();
	}
}
tink_json_BasicParser.__name__ = true;
class tink_json_Parser0 extends tink_json_BasicParser {
	constructor() {
		super();
	}
	process0() {
		let _gthis = this;
		let cur = 0;
		let v_assets = null;
		let v_version = null;
		let hasv_version = false;
		let __start__ = this.pos;
		while(true) {
			let _g = this.source.charCodeAt(this.pos++);
			let _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					let _g = this.source.charCodeAt(this.pos++);
					let _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 97:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 115) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 115) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 101) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 116) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 115) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 34) {
											while(true) {
												let _g = this.source.charCodeAt(this.pos++);
												let _hx_tmp;
												if(_g == 58 == true) {
													break;
												} else {
													_hx_tmp = _g < 33;
													if(_hx_tmp != true) {
														this.die("expected " + ":");
													}
												}
											}
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											let v_assets1;
											if(this.source.charCodeAt(this.pos) == 110 && this.source.charCodeAt(this.pos + 1) == 117 && this.source.charCodeAt(this.pos + 2) == 108 && this.source.charCodeAt(this.pos + 3) == 108) {
												this.pos += 4;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												v_assets1 = true;
											} else {
												v_assets1 = false;
											}
											if(v_assets1) {
												v_assets = null;
											} else {
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												let v_assets1;
												if(this.source.charCodeAt(this.pos) == 91) {
													this.pos += 1;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													v_assets1 = true;
												} else {
													v_assets1 = false;
												}
												if(!v_assets1) {
													this.die("Expected " + "[");
												}
												let __ret = [];
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												let v_assets2;
												if(this.source.charCodeAt(this.pos) == 93) {
													this.pos += 1;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													v_assets2 = true;
												} else {
													v_assets2 = false;
												}
												if(!v_assets2) {
													while(true) {
														__ret.push(new setup_$hashlink_ReleaseAsset(this.process1()));
														while(this.source.charCodeAt(this.pos) < 33) this.pos++;
														let v_assets;
														if(this.source.charCodeAt(this.pos) == 44) {
															this.pos += 1;
															while(this.source.charCodeAt(this.pos) < 33) this.pos++;
															v_assets = true;
														} else {
															v_assets = false;
														}
														if(!v_assets) {
															break;
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													let v_assets;
													if(this.source.charCodeAt(this.pos) == 93) {
														this.pos += 1;
														while(this.source.charCodeAt(this.pos) < 33) this.pos++;
														v_assets = true;
													} else {
														v_assets = false;
													}
													if(!v_assets) {
														this.die("Expected " + "]");
													}
												}
												v_assets = tink_pure_List.fromArray(__ret);
											}
											while(this.source.charCodeAt(this.pos) < 33) this.pos++;
											let tmp;
											if(this.source.charCodeAt(this.pos) == 44) {
												this.pos += 1;
												tmp = true;
											} else {
												tmp = false;
											}
											if(!tmp) {
												break _hx_loop4;
											} else {
												continue;
											}
										}
									}
								}
							}
						}
					}
					break;
				case 118:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 101) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 114) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 115) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 105) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 111) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 110) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 34) {
												while(true) {
													let _g = this.source.charCodeAt(this.pos++);
													let _hx_tmp;
													if(_g == 58 == true) {
														break;
													} else {
														_hx_tmp = _g < 33;
														if(_hx_tmp != true) {
															this.die("expected " + ":");
														}
													}
												}
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												let this1 = this.parseString();
												v_version = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
												hasv_version = true;
												while(this.source.charCodeAt(this.pos) < 33) this.pos++;
												let tmp;
												if(this.source.charCodeAt(this.pos) == 44) {
													this.pos += 1;
													tmp = true;
												} else {
													tmp = false;
												}
												if(!tmp) {
													break _hx_loop4;
												} else {
													continue;
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					let _g = this.source.charCodeAt(this.pos++);
					let _hx_tmp;
					if(_g == 58 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				let tmp;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp = true;
				} else {
					tmp = false;
				}
				if(!tmp) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		let __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { assets : v_assets, version : hasv_version ? v_version : __missing__("version")};
	}
	process1() {
		let _gthis = this;
		let cur = 0;
		let v_file = null;
		let hasv_file = false;
		let v_platform = null;
		let hasv_platform = false;
		let __start__ = this.pos;
		while(true) {
			let _g = this.source.charCodeAt(this.pos++);
			let _hx_tmp;
			if(_g == 123 == true) {
				break;
			} else {
				_hx_tmp = _g < 33;
				if(_hx_tmp != true) {
					this.die("expected " + "{");
				}
			}
		}
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp;
		if(this.source.charCodeAt(this.pos) == 125) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			_hx_loop4: while(true) {
				while(true) {
					let _g = this.source.charCodeAt(this.pos++);
					let _hx_tmp;
					if(_g == 34 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + "\"");
						}
					}
				}
				cur = this.source.charCodeAt(this.pos++);
				switch(cur) {
				case 102:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 105) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 108) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 101) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 34) {
									while(true) {
										let _g = this.source.charCodeAt(this.pos++);
										let _hx_tmp;
										if(_g == 58 == true) {
											break;
										} else {
											_hx_tmp = _g < 33;
											if(_hx_tmp != true) {
												this.die("expected " + ":");
											}
										}
									}
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									let this1 = this.parseString();
									v_file = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
									hasv_file = true;
									while(this.source.charCodeAt(this.pos) < 33) this.pos++;
									let tmp;
									if(this.source.charCodeAt(this.pos) == 44) {
										this.pos += 1;
										tmp = true;
									} else {
										tmp = false;
									}
									if(!tmp) {
										break _hx_loop4;
									} else {
										continue;
									}
								}
							}
						}
					}
					break;
				case 112:
					cur = this.source.charCodeAt(this.pos++);
					if(cur == 108) {
						cur = this.source.charCodeAt(this.pos++);
						if(cur == 97) {
							cur = this.source.charCodeAt(this.pos++);
							if(cur == 116) {
								cur = this.source.charCodeAt(this.pos++);
								if(cur == 102) {
									cur = this.source.charCodeAt(this.pos++);
									if(cur == 111) {
										cur = this.source.charCodeAt(this.pos++);
										if(cur == 114) {
											cur = this.source.charCodeAt(this.pos++);
											if(cur == 109) {
												cur = this.source.charCodeAt(this.pos++);
												if(cur == 34) {
													while(true) {
														let _g = this.source.charCodeAt(this.pos++);
														let _hx_tmp;
														if(_g == 58 == true) {
															break;
														} else {
															_hx_tmp = _g < 33;
															if(_hx_tmp != true) {
																this.die("expected " + ":");
															}
														}
													}
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													let this1 = this.parseString();
													let v = this1.indexOf(tink_json_JsonString.BACKSLASH) == -1 ? this1 : JSON.parse("\"" + this1 + "\"");
													switch(v) {
													case "Linux":case "Mac":case "Windows":
														v_platform = v;
														break;
													default:
														throw haxe_Exception.thrown(new tink_core_TypedError(422,"Unrecognized enum value: " + v + ". Accepted values are: " + new tink_json_Writer0().write(["Linux","Mac","Windows"]),{ fileName : "tink/json/macros/GenReader.hx", lineNumber : 454, className : "tink.json.Parser0", methodName : "process1"}));
													}
													hasv_platform = true;
													while(this.source.charCodeAt(this.pos) < 33) this.pos++;
													let tmp;
													if(this.source.charCodeAt(this.pos) == 44) {
														this.pos += 1;
														tmp = true;
													} else {
														tmp = false;
													}
													if(!tmp) {
														break _hx_loop4;
													} else {
														continue;
													}
												}
											}
										}
									}
								}
							}
						}
					}
					break;
				}
				if(cur != 34) {
					this.skipString();
				}
				while(true) {
					let _g = this.source.charCodeAt(this.pos++);
					let _hx_tmp;
					if(_g == 58 == true) {
						break;
					} else {
						_hx_tmp = _g < 33;
						if(_hx_tmp != true) {
							this.die("expected " + ":");
						}
					}
				}
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				this.skipValue();
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				let tmp;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					tmp = true;
				} else {
					tmp = false;
				}
				if(!tmp) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp;
			if(this.source.charCodeAt(this.pos) == 125) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "}");
			}
		}
		let __missing__ = function(field) {
			return _gthis.die("missing field \"" + field + "\"",__start__);
		};
		return { file : hasv_file ? v_file : __missing__("file"), platform : hasv_platform ? v_platform : __missing__("platform")};
	}
	parse(source) {
		if(this.afterParsing.length > 0) {
			this.afterParsing = [];
		}
		this.init(source);
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp;
		if(this.source.charCodeAt(this.pos) == 91) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp = true;
		} else {
			tmp = false;
		}
		if(!tmp) {
			this.die("Expected " + "[");
		}
		let __ret = [];
		while(this.source.charCodeAt(this.pos) < 33) this.pos++;
		let tmp1;
		if(this.source.charCodeAt(this.pos) == 93) {
			this.pos += 1;
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			tmp1 = true;
		} else {
			tmp1 = false;
		}
		if(!tmp1) {
			while(true) {
				__ret.push(new setup_$hashlink_Release(this.process0()));
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				let tmp;
				if(this.source.charCodeAt(this.pos) == 44) {
					this.pos += 1;
					while(this.source.charCodeAt(this.pos) < 33) this.pos++;
					tmp = true;
				} else {
					tmp = false;
				}
				if(!tmp) {
					break;
				}
			}
			while(this.source.charCodeAt(this.pos) < 33) this.pos++;
			let tmp;
			if(this.source.charCodeAt(this.pos) == 93) {
				this.pos += 1;
				while(this.source.charCodeAt(this.pos) < 33) this.pos++;
				tmp = true;
			} else {
				tmp = false;
			}
			if(!tmp) {
				this.die("Expected " + "]");
			}
		}
		let _g = 0;
		let _g1 = this.afterParsing;
		while(_g < _g1.length) _g1[_g++]();
		if(this.afterParsing.length > 0) {
			this.afterParsing = [];
		}
		return __ret;
	}
}
tink_json_Parser0.__name__ = true;
class tink_core_Annex {
	constructor(target) {
		this.target = target;
		this.registry = new haxe_ds_ObjectMap();
	}
}
tink_core_Annex.__name__ = true;
class setup_$hashlink_Release {
	constructor(__coco_init) {
		let _gthis = this;
		let before = tink_state_internal_AutoObservable.cur;
		tink_state_internal_AutoObservable.cur = null;
		let ret = new tink_state_internal_AutoObservable(tink_state_internal__$AutoObservable_Computation.sync(function() {
			let platform = Sys.systemName();
			let _g = tink_pure_List.first(_gthis.assets,function(asset) {
				return asset.platform == platform;
			});
			let compute;
			switch(_g._hx_index) {
			case 0:
				compute = tink_Url.fromString("releases/download/" + tink_state_Observable.get_value(_gthis.__coco_tag) + "/" + _g.v.file);
				break;
			case 1:
				compute = tink_Url.fromString("archive/refs/tags/" + tink_state_Observable.get_value(_gthis.__coco_tag) + ".zip");
				break;
			}
			return tink_Url.resolve(setup_$hashlink_Release.baseUrl,compute);
		}),null,null);
		tink_state_internal_AutoObservable.cur = before;
		this.__coco_url = ret;
		let before1 = tink_state_internal_AutoObservable.cur;
		tink_state_internal_AutoObservable.cur = null;
		let ret1 = new tink_state_internal_AutoObservable(tink_state_internal__$AutoObservable_Computation.sync(function() {
			let semver = tink_core_OutcomeTools.sure(tink_semver_Version.parse(_gthis.version));
			let tag = "" + semver.major + "." + semver.minor;
			if(semver.patch > 0) {
				return "" + tag + "." + semver.patch;
			} else {
				return tag;
			}
		}),null,null);
		tink_state_internal_AutoObservable.cur = before1;
		this.__coco_tag = ret1;
		let before2 = tink_state_internal_AutoObservable.cur;
		tink_state_internal_AutoObservable.cur = null;
		let ret2 = new tink_state_internal_AutoObservable(tink_state_internal__$AutoObservable_Computation.sync(function() {
			let platform = Sys.systemName();
			return tink_pure_List.first(_gthis.assets,function(asset) {
				return asset.platform == platform;
			}) == haxe_ds_Option.None;
		}),null,null);
		tink_state_internal_AutoObservable.cur = before2;
		this.__coco_isSource = ret2;
		let before3 = tink_state_internal_AutoObservable.cur;
		tink_state_internal_AutoObservable.cur = null;
		let ret3 = new tink_state_internal_AutoObservable(tink_state_internal__$AutoObservable_Computation.sync(function() {
			let ret = false;
			let _g = new tink_pure_NodeIterator(setup_$hashlink_Release.data);
			while(_g.list.length > 0) if(_g.next().version == _gthis.version) {
				ret = true;
				break;
			}
			return ret;
		}),null,null);
		tink_state_internal_AutoObservable.cur = before3;
		this.__coco_exists = ret3;
		let _g = __coco_init.assets;
		this.assets = _g == null ? tink_pure_List.fromArray([]) : _g;
		this.version = __coco_init.version;
		this.__coco_transitionCount = tink_state_State._new(0);
		this.errorTrigger = tink_core_Signal.trigger();
		this.transitionErrors = this.errorTrigger;
		this.annex = new coconut_data_helpers_Annex(this);
		this.observables = { assets : new tink_state__$Observable_ConstObservable(this.assets,null), exists : this.__coco_exists, isSource : this.__coco_isSource, tag : this.__coco_tag, url : this.__coco_url, version : new tink_state__$Observable_ConstObservable(this.version,null), isInTransition : tink_state_Observable.map(this.__coco_transitionCount,tink_state__$Observable_Transform.plain(function(count) {
			return count > 0;
		}))};
	}
}
setup_$hashlink_Release.__name__ = true;
class setup_$hashlink_ReleaseAsset {
	constructor(__coco_init) {
		this.file = __coco_init.file;
		this.platform = __coco_init.platform;
		this.__coco_transitionCount = tink_state_State._new(0);
		this.errorTrigger = tink_core_Signal.trigger();
		this.transitionErrors = this.errorTrigger;
		this.annex = new coconut_data_helpers_Annex(this);
		this.observables = { file : new tink_state__$Observable_ConstObservable(this.file,null), platform : new tink_state__$Observable_ConstObservable(this.platform,null), isInTransition : tink_state_Observable.map(this.__coco_transitionCount,tink_state__$Observable_Transform.plain(function(count) {
			return count > 0;
		}))};
	}
}
setup_$hashlink_ReleaseAsset.__name__ = true;
class setup_$hashlink_Setup {
	constructor(release) {
		this.release = release;
	}
	download() {
		let cache;
		let _gthis = this;
		return tink_core_Promise.next(tink_core_Promise.next(tink_core_Promise.next(tink_core_Future.ofJsPromise(js_actions_ToolCache.downloadTool(tink_Url.toString(tink_state_Observable.get_value(this.release.__coco_url)))),function(file) {
			return tink_core_Future.ofJsPromise(js_actions_ToolCache.extractZip(file));
		}),function(path) {
			cache = path;
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(_gthis.findSubfolder(path)));
		}),function(name) {
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(setup_$hashlink_PathTools.normalizeSeparator(haxe_io_Path.join([cache,name])))));
		});
	}
	install() {
		let cache = js_actions_ToolCache.find("hashlink",this.release.version);
		let _gthis = this;
		return tink_core_Promise.next(tink_core_Promise.next(cache.length > 0 ? new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(cache))) : tink_core_Promise.next(this.download(),function(path) {
			return tink_core_Future.ofJsPromise(js_actions_ToolCache.cacheDir(path,"hashlink",_gthis.release.version));
		}),function(path) {
			if(tink_state_Observable.get_value(_gthis.release.__coco_isSource)) {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(_gthis.compile(path)));
			} else {
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(path)));
			}
		}),function(path) {
			let resolvedPath = setup_$hashlink_PathTools.normalizeSeparator(path);
			js_actions_Core.addPath(Sys.systemName() == "Windows" ? resolvedPath : haxe_io_Path.join([resolvedPath,"bin"]));
			return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Success(resolvedPath)));
		});
	}
	compile(directory) {
		let platform = Sys.systemName();
		if(platform != "Linux") {
			return tink_core_Outcome.Failure(new tink_core_TypedError(405,"Compilation is not supported on " + platform + " platform.",{ fileName : "src/setup_hashlink/Setup.hx", lineNumber : 53, className : "setup_hashlink.Setup", methodName : "compile"}));
		}
		let dependencies = ["libmbedtls-dev","libopenal-dev","libpng-dev","libsdl2-dev","libturbojpeg0-dev","libuv1-dev","libvorbis-dev"];
		let result = new Array(dependencies.length);
		let _g = 0;
		let _g1 = dependencies.length;
		while(_g < _g1) {
			let i = _g++;
			result[i] = "sudo apt install " + dependencies[i];
		}
		let commands = result.concat(["make","make all","sudo make install","sudo ldconfig"]);
		process.chdir(directory);
		Lambda.iter(commands,function(command) {
			js_node_ChildProcess.spawnSync(command,{ shell : true, stdio : "inherit"});
		});
		return tink_core_Outcome.Success("/usr/local");
	}
	findSubfolder(directory) {
		let _this = js_node_Fs.readdirSync(directory);
		let _g = [];
		let _g1 = 0;
		while(_g1 < _this.length) {
			let v = _this[_g1];
			++_g1;
			if(sys_FileSystem.isDirectory(haxe_io_Path.join([directory,v]))) {
				_g.push(v);
			}
		}
		switch(_g.length) {
		case 0:
			return tink_core_Outcome.Failure(new tink_core_TypedError(404,"No subfolder found in: " + directory + ".",{ fileName : "src/setup_hashlink/Setup.hx", lineNumber : 81, className : "setup_hashlink.Setup", methodName : "findSubfolder"}));
		case 1:
			return tink_core_Outcome.Success(_g[0]);
		default:
			return tink_core_Outcome.Failure(new tink_core_TypedError(409,"Multiple subfolders found in: " + directory + ".",{ fileName : "src/setup_hashlink/Setup.hx", lineNumber : 83, className : "setup_hashlink.Setup", methodName : "findSubfolder"}));
		}
	}
}
setup_$hashlink_Setup.__name__ = true;
class sys_FileSystem {
	static isDirectory(path) {
		try {
			return js_node_Fs.statSync(path).isDirectory();
		} catch( _g ) {
			return false;
		}
	}
}
sys_FileSystem.__name__ = true;
class tink_core_Callback {
	static invoke(this1,data) {
		if(tink_core_Callback.depth < 500) {
			tink_core_Callback.depth++;
			this1(data);
			tink_core_Callback.depth--;
		} else {
			tink_core_Callback.defer(function() {
				this1(data);
			});
		}
	}
	static defer(f) {
		process.nextTick(f);
	}
}
class tink_core_CallbackLinkRef {
	constructor() {
	}
	cancel() {
		let this1 = this.link;
		if(this1 != null) {
			this1.cancel();
		}
	}
}
tink_core_CallbackLinkRef.__name__ = true;
class tink_core_SimpleLink {
	constructor(f) {
		this.f = f;
	}
	cancel() {
		if(this.f != null) {
			this.f();
			this.f = null;
		}
	}
}
tink_core_SimpleLink.__name__ = true;
class tink_core__$Callback_LinkPair {
	constructor(a,b) {
		this.dissolved = false;
		this.a = a;
		this.b = b;
	}
	cancel() {
		if(!this.dissolved) {
			this.dissolved = true;
			let this1 = this.a;
			if(this1 != null) {
				this1.cancel();
			}
			let this2 = this.b;
			if(this2 != null) {
				this2.cancel();
			}
			this.a = null;
			this.b = null;
		}
	}
}
tink_core__$Callback_LinkPair.__name__ = true;
class tink_core__$Callback_ListCell {
	constructor(cb,list) {
		if(cb == null) {
			throw haxe_Exception.thrown("callback expected but null received");
		}
		this.cb = cb;
		this.list = list;
	}
	cancel() {
		if(this.list != null) {
			let list = this.list;
			this.cb = null;
			this.list = null;
			if(--list.used <= list.cells.length >> 1) {
				list.compact();
			}
		}
	}
}
tink_core__$Callback_ListCell.__name__ = true;
class tink_core_SimpleDisposable {
	constructor(dispose) {
		if(tink_core_SimpleDisposable._hx_skip_constructor) {
			return;
		}
		this._hx_constructor(dispose);
	}
	_hx_constructor(dispose) {
		this.disposeHandlers = [];
		this.f = dispose;
	}
	dispose() {
		let _g = this.disposeHandlers;
		if(_g != null) {
			this.disposeHandlers = null;
			let f = this.f;
			this.f = tink_core_SimpleDisposable.noop;
			f();
			let _g1 = 0;
			while(_g1 < _g.length) _g[_g1++]();
		}
	}
	static noop() {
	}
}
tink_core_SimpleDisposable.__name__ = true;
class tink_core_CallbackList extends tink_core_SimpleDisposable {
	constructor(destructive) {
		tink_core_SimpleDisposable._hx_skip_constructor = true;
		super();
		tink_core_SimpleDisposable._hx_skip_constructor = false;
		this._hx_constructor(destructive);
	}
	_hx_constructor(destructive) {
		if(destructive == null) {
			destructive = false;
		}
		this.onfill = function() {
		};
		this.ondrain = function() {
		};
		this.busy = false;
		this.queue = [];
		this.used = 0;
		let _gthis = this;
		super._hx_constructor(function() {
			if(!_gthis.busy) {
				_gthis.destroy();
			}
		});
		this.destructive = destructive;
		this.cells = [];
	}
	destroy() {
		let _g = 0;
		let _g1 = this.cells;
		while(_g < _g1.length) {
			let c = _g1[_g];
			++_g;
			c.cb = null;
			c.list = null;
		}
		this.queue = null;
		this.cells = null;
		if(this.used > 0) {
			this.used = 0;
			let fn = this.ondrain;
			if(tink_core_Callback.depth < 500) {
				tink_core_Callback.depth++;
				fn();
				tink_core_Callback.depth--;
			} else {
				tink_core_Callback.defer(fn);
			}
		}
	}
	invoke(data) {
		let _gthis = this;
		if(tink_core_Callback.depth < 500) {
			tink_core_Callback.depth++;
			if(_gthis.disposeHandlers != null) {
				if(_gthis.busy) {
					if(_gthis.destructive != true) {
						let _g = $bind(_gthis,_gthis.invoke);
						let data1 = data;
						let tmp = function() {
							_g(data1);
						};
						_gthis.queue.push(tmp);
					}
				} else {
					_gthis.busy = true;
					if(_gthis.destructive) {
						_gthis.dispose();
					}
					let length = _gthis.cells.length;
					let _g = 0;
					while(_g < length) {
						let _this = _gthis.cells[_g++];
						if(_this.list != null) {
							_this.cb(data);
						}
					}
					_gthis.busy = false;
					if(_gthis.disposeHandlers == null) {
						_gthis.destroy();
					} else {
						if(_gthis.used < _gthis.cells.length) {
							_gthis.compact();
						}
						if(_gthis.queue.length > 0) {
							(_gthis.queue.shift())();
						}
					}
				}
			}
			tink_core_Callback.depth--;
		} else {
			tink_core_Callback.defer(function() {
				if(_gthis.disposeHandlers != null) {
					if(_gthis.busy) {
						if(_gthis.destructive != true) {
							let _g = $bind(_gthis,_gthis.invoke);
							let data1 = data;
							let tmp = function() {
								_g(data1);
							};
							_gthis.queue.push(tmp);
						}
					} else {
						_gthis.busy = true;
						if(_gthis.destructive) {
							_gthis.dispose();
						}
						let length = _gthis.cells.length;
						let _g = 0;
						while(_g < length) {
							let _this = _gthis.cells[_g++];
							if(_this.list != null) {
								_this.cb(data);
							}
						}
						_gthis.busy = false;
						if(_gthis.disposeHandlers == null) {
							_gthis.destroy();
						} else {
							if(_gthis.used < _gthis.cells.length) {
								_gthis.compact();
							}
							if(_gthis.queue.length > 0) {
								(_gthis.queue.shift())();
							}
						}
					}
				}
			});
		}
	}
	compact() {
		if(this.busy) {
			return;
		} else if(this.used == 0) {
			this.resize(0);
			let fn = this.ondrain;
			if(tink_core_Callback.depth < 500) {
				tink_core_Callback.depth++;
				fn();
				tink_core_Callback.depth--;
			} else {
				tink_core_Callback.defer(fn);
			}
		} else {
			let compacted = 0;
			let _g = 0;
			let _g1 = this.cells.length;
			while(_g < _g1) {
				let i = _g++;
				let _g1 = this.cells[i];
				if(_g1.cb != null) {
					if(compacted != i) {
						this.cells[compacted] = _g1;
					}
					if(++compacted == this.used) {
						break;
					}
				}
			}
			this.resize(this.used);
		}
	}
	resize(length) {
		this.cells.length = length;
	}
}
tink_core_CallbackList.__name__ = true;
class tink_core_TypedError {
	constructor(code,message,pos) {
		if(code == null) {
			code = 500;
		}
		this.isTinkError = true;
		this.code = code;
		this.message = message;
		this.pos = pos;
		this.exceptionStack = [];
		this.callStack = [];
	}
	printPos() {
		return this.pos.className + "." + this.pos.methodName + ":" + this.pos.lineNumber;
	}
	toString() {
		let ret = "Error#" + this.code + ": " + this.message;
		if(this.pos != null) {
			ret += " @ " + this.printPos();
		}
		return ret;
	}
	throwSelf() {
		throw haxe_Exception.thrown(this);
	}
	static withData(code,message,data,pos) {
		return tink_core_TypedError.typed(code,message,data,pos);
	}
	static typed(code,message,data,pos) {
		let ret = new tink_core_TypedError(code,message,pos);
		ret.data = data;
		return ret;
	}
	static asError(v) {
		if(v != null && v.isTinkError) {
			return v;
		} else {
			return null;
		}
	}
	static catchExceptions(f,report,pos) {
		try {
			return tink_core_Outcome.Success(f());
		} catch( _g ) {
			let e = tink_core_TypedError.asError(haxe_Exception.caught(_g).unwrap());
			return tink_core_Outcome.Failure(e == null ? report == null ? tink_core_TypedError.withData(null,"Unexpected Error",e,pos) : report(e) : e);
		}
	}
}
tink_core_TypedError.__name__ = true;
class tink_core__$Future_NeverFuture {
	constructor() {
	}
	getStatus() {
		return tink_core_FutureStatus.NeverEver;
	}
	handle(callback) {
		return null;
	}
}
tink_core__$Future_NeverFuture.__name__ = true;
class tink_core__$Lazy_LazyConst {
	constructor(value) {
		this.value = value;
	}
	get() {
		return this.value;
	}
	compute() {
	}
}
tink_core__$Lazy_LazyConst.__name__ = true;
class tink_core__$Future_SyncFuture {
	constructor(value) {
		this.value = value;
	}
	getStatus() {
		return tink_core_FutureStatus.Ready(this.value);
	}
	handle(cb) {
		tink_core_Callback.invoke(cb,tink_core_Lazy.get(this.value));
		return null;
	}
}
tink_core__$Future_SyncFuture.__name__ = true;
class tink_core_Future {
	static flatMap(this1,next,gather) {
		let _g = this1.getStatus();
		switch(_g._hx_index) {
		case 3:
			let l = _g.result;
			return new tink_core__$Future_SuspendableFuture(function(fire) {
				return next(tink_core_Lazy.get(l)).handle(function(v) {
					fire(v);
				});
			});
		case 4:
			return tink_core_Future.NEVER;
		default:
			return new tink_core__$Future_SuspendableFuture(function($yield) {
				let inner = new tink_core_CallbackLinkRef();
				return new tink_core__$Callback_LinkPair(this1.handle(function(v) {
					let outer = next(v).handle($yield);
					inner.link = outer;
				}),inner);
			});
		}
	}
	static ofJsPromise(promise) {
		return tink_core_Future.irreversible(function(cb) {
			promise.then(function(a) {
				let _g = cb;
				let a1 = tink_core_Outcome.Success(a);
				tink_core_Callback.defer(function() {
					_g(a1);
				});
			},function(e) {
				cb(tink_core_Outcome.Failure(tink_core_TypedError.withData(null,e.message,e,{ fileName : "tink/core/Future.hx", lineNumber : 158, className : "tink.core._Future.Future_Impl_", methodName : "ofJsPromise"})));
			});
		});
	}
	static irreversible(init) {
		return new tink_core__$Future_SuspendableFuture(function($yield) {
			init($yield);
			return null;
		});
	}
}
var tink_core_FutureStatus = $hxEnums["tink.core.FutureStatus"] = { __ename__:true,__constructs__:null
	,Suspended: {_hx_name:"Suspended",_hx_index:0,__enum__:"tink.core.FutureStatus",toString:$estr}
	,Awaited: {_hx_name:"Awaited",_hx_index:1,__enum__:"tink.core.FutureStatus",toString:$estr}
	,EagerlyAwaited: {_hx_name:"EagerlyAwaited",_hx_index:2,__enum__:"tink.core.FutureStatus",toString:$estr}
	,Ready: ($_=function(result) { return {_hx_index:3,result:result,__enum__:"tink.core.FutureStatus",toString:$estr}; },$_._hx_name="Ready",$_.__params__ = ["result"],$_)
	,NeverEver: {_hx_name:"NeverEver",_hx_index:4,__enum__:"tink.core.FutureStatus",toString:$estr}
};
tink_core_FutureStatus.__constructs__ = [tink_core_FutureStatus.Suspended,tink_core_FutureStatus.Awaited,tink_core_FutureStatus.EagerlyAwaited,tink_core_FutureStatus.Ready,tink_core_FutureStatus.NeverEver];
class tink_core__$Future_SuspendableFuture {
	constructor(wakeup) {
		this.status = tink_core_FutureStatus.Suspended;
		this.wakeup = wakeup;
		this.callbacks = new tink_core_CallbackList(true);
		let _gthis = this;
		this.callbacks.ondrain = function() {
			if(_gthis.status == tink_core_FutureStatus.Awaited) {
				_gthis.status = tink_core_FutureStatus.Suspended;
				let this1 = _gthis.link;
				if(this1 != null) {
					this1.cancel();
				}
				_gthis.link = null;
			}
		};
		this.callbacks.onfill = function() {
			if(_gthis.status == tink_core_FutureStatus.Suspended) {
				_gthis.status = tink_core_FutureStatus.Awaited;
				_gthis.arm();
			}
		};
	}
	getStatus() {
		return this.status;
	}
	trigger(value) {
		if(this.status._hx_index != 3) {
			this.status = tink_core_FutureStatus.Ready(new tink_core__$Lazy_LazyConst(value));
			let link = this.link;
			this.link = null;
			this.wakeup = null;
			this.callbacks.invoke(value);
			if(link != null) {
				link.cancel();
			}
		}
	}
	handle(callback) {
		let _g = this.status;
		if(_g._hx_index == 3) {
			tink_core_Callback.invoke(callback,tink_core_Lazy.get(_g.result));
			return null;
		} else {
			let _this = this.callbacks;
			if(_this.disposeHandlers == null) {
				return null;
			} else {
				let node = new tink_core__$Callback_ListCell(callback,_this);
				_this.cells.push(node);
				if(_this.used++ == 0) {
					let fn = _this.onfill;
					if(tink_core_Callback.depth < 500) {
						tink_core_Callback.depth++;
						fn();
						tink_core_Callback.depth--;
					} else {
						tink_core_Callback.defer(fn);
					}
				}
				return node;
			}
		}
	}
	arm() {
		let _gthis = this;
		this.link = this.wakeup(function(x) {
			_gthis.trigger(x);
		});
	}
}
tink_core__$Future_SuspendableFuture.__name__ = true;
class tink_core_Lazy {
	static get(this1) {
		this1.compute();
		return this1.get();
	}
}
class tink_core_NamedWith {
}
tink_core_NamedWith.__name__ = true;
var tink_core_Outcome = $hxEnums["tink.core.Outcome"] = { __ename__:true,__constructs__:null
	,Success: ($_=function(data) { return {_hx_index:0,data:data,__enum__:"tink.core.Outcome",toString:$estr}; },$_._hx_name="Success",$_.__params__ = ["data"],$_)
	,Failure: ($_=function(failure) { return {_hx_index:1,failure:failure,__enum__:"tink.core.Outcome",toString:$estr}; },$_._hx_name="Failure",$_.__params__ = ["failure"],$_)
};
tink_core_Outcome.__constructs__ = [tink_core_Outcome.Success,tink_core_Outcome.Failure];
class tink_core_OutcomeTools {
	static sure(outcome) {
		switch(outcome._hx_index) {
		case 0:
			return outcome.data;
		case 1:
			let _g = outcome.failure;
			let _g1 = tink_core_TypedError.asError(_g);
			if(_g1 == null) {
				throw haxe_Exception.thrown(_g);
			} else {
				return _g1.throwSelf();
			}
			break;
		}
	}
}
tink_core_OutcomeTools.__name__ = true;
class tink_core_Promise {
	static next(this1,f,gather) {
		return tink_core_Future.flatMap(this1,function(o) {
			switch(o._hx_index) {
			case 0:
				return f(o.data);
			case 1:
				return new tink_core__$Future_SyncFuture(new tink_core__$Lazy_LazyConst(tink_core_Outcome.Failure(o.failure)));
			}
		});
	}
}
class tink_core_Signal {
	static trigger() {
		return new tink_core_SignalTrigger();
	}
}
class tink_core_SignalTrigger {
	constructor() {
	}
}
tink_core_SignalTrigger.__name__ = true;
class tink_json_JsonString {
}
var tink_json_Value = $hxEnums["tink.json.Value"] = { __ename__:true,__constructs__:null
	,VNumber: ($_=function(f) { return {_hx_index:0,f:f,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VNumber",$_.__params__ = ["f"],$_)
	,VString: ($_=function(s) { return {_hx_index:1,s:s,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VString",$_.__params__ = ["s"],$_)
	,VNull: {_hx_name:"VNull",_hx_index:2,__enum__:"tink.json.Value",toString:$estr}
	,VBool: ($_=function(b) { return {_hx_index:3,b:b,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VBool",$_.__params__ = ["b"],$_)
	,VArray: ($_=function(a) { return {_hx_index:4,a:a,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VArray",$_.__params__ = ["a"],$_)
	,VObject: ($_=function(a) { return {_hx_index:5,a:a,__enum__:"tink.json.Value",toString:$estr}; },$_._hx_name="VObject",$_.__params__ = ["a"],$_)
};
tink_json_Value.__constructs__ = [tink_json_Value.VNumber,tink_json_Value.VString,tink_json_Value.VNull,tink_json_Value.VBool,tink_json_Value.VArray,tink_json_Value.VObject];
class tink_json_BasicWriter {
	constructor() {
		this.plugins = new tink_core_Annex(this);
	}
	init() {
		this.buf = "";
	}
}
tink_json_BasicWriter.__name__ = true;
class tink_json_Writer0 extends tink_json_BasicWriter {
	constructor() {
		super();
	}
	write(value) {
		this.init();
		this.buf += String.fromCodePoint(91);
		let first = true;
		let _g = 0;
		while(_g < value.length) {
			let value1 = value[_g++];
			if(first) {
				first = false;
			} else {
				this.buf += String.fromCodePoint(44);
			}
			let s = JSON.stringify(value1);
			this.buf += s;
		}
		this.buf += String.fromCodePoint(93);
		return this.buf.toString();
	}
}
tink_json_Writer0.__name__ = true;
class tink_parse_Char {
	static ofRange(i) {
		let ret = new Array(256);
		if(i.max > 256) {
			i = new IntIterator(i.min,256);
		}
		let _g = i;
		while(_g.min < _g.max) ret[_g.min++] = true;
		return ret;
	}
	static oneOf(chars) {
		let ret = new Array(256);
		let _g = 0;
		while(_g < chars.length) ret[chars[_g++]] = true;
		return ret;
	}
}
class tink_parse_ParserBase {
	constructor(source,reporter,offset) {
		if(offset == null) {
			offset = 0;
		}
		this.source = source;
		this.max = source.length;
		this.pos = 0;
		this.reporter = reporter;
		this.offset = offset;
	}
	skipIgnored() {
		while(this.lastSkip != this.pos) {
			this.lastSkip = this.pos;
			this.doSkipIgnored();
		}
		this.lastSkip = this.pos;
		return null;
	}
	doSkipIgnored() {
	}
	allowHere(s) {
		if(tink_parse_StringSlice.hasSub(this.source,s,this.pos)) {
			this.pos += s.length;
			return true;
		} else {
			return false;
		}
	}
	die(message,range) {
		if(range == null) {
			range = new IntIterator(this.pos,this.pos + 1);
		}
		let from = range.min;
		let to = range.max;
		let pos = this.reporter.makePos(this.offset + from,this.offset + (to == null ? from + 1 : to));
		throw haxe_Exception.thrown(this.reporter.makeError(message,pos));
	}
}
tink_parse_ParserBase.__name__ = true;
class tink_parse__$StringSlice_Data {
	constructor(string,start,end) {
		this.string = string;
		this.start = start;
		this.end = end;
		if((this.length = end - start) < 0) {
			this.length = 0;
			this.end = this.start;
		}
	}
	toString() {
		if(this.representation == null) {
			this.representation = this.string.substring(this.start,this.end);
		}
		return this.representation;
	}
}
tink_parse__$StringSlice_Data.__name__ = true;
class tink_parse_StringSlice {
	static _new(string,start,end) {
		return new tink_parse__$StringSlice_Data(string,start == string.length ? start : start < 0 ? start % string.length + string.length : start % string.length,end == string.length ? end : end < 0 ? end % string.length + string.length : end % string.length);
	}
	static clamp(this1,index) {
		if(index < 0) {
			if(-index > this1.length) {
				return 0;
			} else {
				return index + this1.length;
			}
		} else if(index > this1.length) {
			return this1.length;
		} else {
			return index;
		}
	}
	static wrap(this1,index) {
		if(index < 0) {
			return index + this1.length;
		} else {
			return index;
		}
	}
	static ofString(s) {
		if(s == null || s == "") {
			return tink_parse_StringSlice.EMPTY;
		} else if(s.length == 1) {
			let _g = s.charCodeAt(0);
			if(_g < tink_parse_StringSlice.CHARS.length) {
				return tink_parse_StringSlice.CHARS[_g];
			} else {
				return new tink_parse__$StringSlice_Data(s,0,s.length);
			}
		} else {
			return new tink_parse__$StringSlice_Data(s,0,s.length);
		}
	}
	static hasSub(this1,other,at) {
		if(at == null) {
			at = 0;
		}
		at = tink_parse_StringSlice.wrap(this1,at);
		if(at + other.length > this1.length) {
			return false;
		}
		let b = other;
		return tink_parse_StringSlice.isEqual(this1.string,this1.start + at,other.length,b.string,b.start,b.length);
	}
	static isEqual(s1,p1,l1,s2,p2,l2) {
		if(l2 != l1) {
			return false;
		}
		let _g = 0;
		while(_g < l2) {
			let i = _g++;
			if(s1.charCodeAt(p1 + i) != s2.charCodeAt(p2 + i)) {
				return false;
			}
		}
		return true;
	}
}
class tink_pure_NodeIterator {
	constructor(node) {
		this.list = [];
		if(node != null) {
			this.list.push(node);
		}
	}
	hasNext() {
		return this.list.length > 0;
	}
	next() {
		let _g = this.list.pop();
		if(_g == null) {
			return null;
		} else {
			let _g1 = -_g.tails.length;
			while(_g1 < 0) this.list.push(_g.tails[-(_g1++) - 1]);
			return _g.value;
		}
	}
}
tink_pure_NodeIterator.__name__ = true;
class tink_semver__$Parser_Reporter {
	constructor(source) {
		this.source = source;
	}
	makeError(message,pos) {
		let this1 = this.source;
		let tmp = tink_parse_StringSlice._new(this1.string,tink_parse_StringSlice.wrap(this1,pos.min) + this1.start,tink_parse_StringSlice.clamp(this1,pos.max) + this1.start);
		return new tink_core_TypedError(null,"" + message + " at " + ("\"" + (tmp == null ? "null" : tmp.toString()) + "\"(" + pos.min + "-" + pos.max + ")") + (" in \"" + (this.source == null ? "null" : this.source.toString()) + "\""),{ fileName : "tink/semver/Parser.hx", lineNumber : 23, className : "tink.semver._Parser.Reporter", methodName : "makeError"});
	}
	makePos(from,to) {
		return new IntIterator(from,to);
	}
}
tink_semver__$Parser_Reporter.__name__ = true;
class tink_semver_Parser extends tink_parse_ParserBase {
	constructor(s) {
		super(s,new tink_semver__$Parser_Reporter(s));
	}
	doSkipIgnored() {
		while(true) {
			let tmp;
			if(this.pos < this.max) {
				let this1 = this.source;
				tmp = tink_parse_Char.WHITE[this1.string.charCodeAt(this.pos + this1.start)];
			} else {
				tmp = false;
			}
			if(!tmp) {
				break;
			}
			this.pos++;
		}
	}
	num() {
		this.skipIgnored();
		let start = this.pos;
		while(true) {
			let _g;
			if(this.pos < this.max) {
				let this1 = this.source;
				_g = tink_parse_Char.DIGIT[this1.string.charCodeAt(this.pos + this1.start)];
			} else {
				_g = false;
			}
			if(!_g) {
				break;
			}
			this.pos++;
		}
		let this1 = this.source;
		let _g = Std.parseInt(tink_parse_StringSlice._new(this1.string,tink_parse_StringSlice.wrap(this1,start) + this1.start,tink_parse_StringSlice.clamp(this1,this.pos) + this1.start).toString());
		if(_g == null) {
			return -1;
		} else {
			return _g;
		}
	}
	parseVersion() {
		let ret = this.parseInlineVersion();
		this.skipIgnored();
		if(this.pos == this.max) {
			return ret;
		} else {
			return this.die("Unexpected string",new IntIterator(this.pos,this.max));
		}
	}
	parsePartial() {
		let start = this.pos;
		let _gthis = this;
		let next = function() {
			if(_gthis.allowHere(tink_parse_StringSlice.ofString("."))) {
				return _gthis.num();
			} else {
				return -1;
			}
		};
		let major = this.num();
		let minor = next();
		let patch = next();
		let preview = null;
		let previewNum = -1;
		if(patch >= 0 && this.allowHere(tink_semver_Parser.HYPHEN)) {
			this.skipIgnored();
			let start = this.pos;
			while(true) {
				let preview;
				if(this.pos < this.max) {
					let this1 = this.source;
					preview = tink_parse_Char.LOWER[this1.string.charCodeAt(this.pos + this1.start)];
				} else {
					preview = false;
				}
				if(!preview) {
					break;
				}
				this.pos++;
			}
			let this1 = this.source;
			preview = tink_core_OutcomeTools.sure(tink_semver_Preview.ofString(tink_parse_StringSlice._new(this1.string,tink_parse_StringSlice.wrap(this1,start) + this1.start,tink_parse_StringSlice.clamp(this1,this.pos) + this1.start).toString()));
			if(this.allowHere(tink_semver_Parser.DOT)) {
				previewNum = this.num();
			}
		}
		return { major : major, minor : minor, patch : patch, preview : preview, previewNum : previewNum, pos : new IntIterator(start,this.pos)};
	}
	clamp(i) {
		if(i < 0) {
			return 0;
		} else {
			return i;
		}
	}
	full(p,clamped) {
		if(clamped != true && p.patch < 0) {
			this.die("Partial version not allowed",p.pos);
		}
		let ret = tink_semver_Version._new(p.major,this.clamp(p.minor),this.clamp(p.patch));
		if(p.preview != null) {
			return new tink_semver__$Version_Data(ret.major,ret.minor,ret.patch,p.preview,p.previewNum);
		} else {
			return ret;
		}
	}
	parseInlineVersion() {
		return this.full(this.parsePartial());
	}
}
tink_semver_Parser.__name__ = true;
class tink_semver_Preview {
	static ofString(s) {
		switch(s) {
		case "alpha":
			return tink_core_Outcome.Success("alpha");
		case "beta":
			return tink_core_Outcome.Success("beta");
		case "rc":
			return tink_core_Outcome.Success("rc");
		default:
			return tink_core_Outcome.Failure(new tink_core_TypedError(422,"" + s + " should be alpha | beta | rc",{ fileName : "tink/semver/Preview.hx", lineNumber : 14, className : "tink.semver._Preview.Preview_Impl_", methodName : "ofString"}));
		}
	}
}
class tink_semver_Version {
	static _new(major,minor,patch) {
		if(patch == null) {
			patch = 0;
		}
		if(minor == null) {
			minor = 0;
		}
		return new tink_semver__$Version_Data(major,minor,patch);
	}
	static parse(s) {
		return tink_core_TypedError.catchExceptions(($_=new tink_semver_Parser(tink_parse_StringSlice.ofString(s)),$bind($_,$_.parseVersion)),tink_semver_Version.reportError,{ fileName : "tink/semver/Version.hx", lineNumber : 97, className : "tink.semver._Version.Version_Impl_", methodName : "parse"});
	}
	static reportError(d) {
		if(typeof(d) == "string") {
			return new tink_core_TypedError(422,d,{ fileName : "tink/semver/Version.hx", lineNumber : 103, className : "tink.semver._Version.Version_Impl_", methodName : "reportError"});
		} else {
			return tink_core_TypedError.withData(422,Std.string(d),d,{ fileName : "tink/semver/Version.hx", lineNumber : 105, className : "tink.semver._Version.Version_Impl_", methodName : "reportError"});
		}
	}
}
class tink_semver__$Version_Data {
	constructor(major,minor,patch,preview,previewNum) {
		if(previewNum == null) {
			previewNum = -1;
		}
		if(major < 0 || minor < 0 || patch < 0) {
			throw haxe_Exception.thrown("version components must not be negative");
		}
		this.major = major;
		this.minor = minor;
		this.patch = patch;
		this.preview = preview;
		this.previewNum = previewNum;
	}
	toString() {
		let ret = "" + this.major + "." + this.minor + "." + this.patch;
		if(this.preview != null) {
			ret += "-" + this.preview;
			if(this.previewNum != -1) {
				ret += "." + this.previewNum;
			}
		}
		return ret;
	}
}
tink_semver__$Version_Data.__name__ = true;
class tink_state_Observable {
	static get_value(this1) {
		let ret = this1.getValue();
		if(tink_state_internal_AutoObservable.cur != null) {
			tink_state_internal_AutoObservable.cur.subscribeTo(this1,ret);
		}
		return ret;
	}
	static map(this1,f) {
		return new tink_state_internal_AutoObservable(tink_state_internal__$AutoObservable_Computation.sync(function() {
			let value = tink_state_Observable.get_value(this1);
			return f(value);
		}),null,null);
	}
}
class tink_state__$Observable_ConstObservable {
	constructor(value,toString) {
		this.revision = tink_state_internal_Revision._new();
		this.value = value;
	}
	getRevision() {
		return this.revision;
	}
	getValue() {
		return this.value;
	}
	getComparator() {
		return null;
	}
	onInvalidate(i) {
		return null;
	}
}
tink_state__$Observable_ConstObservable.__name__ = true;
class tink_state_internal_Invalidator {
	constructor(toString) {
		if(tink_state_internal_Invalidator._hx_skip_constructor) {
			return;
		}
		this._hx_constructor(toString);
	}
	_hx_constructor(toString) {
		this.list = new tink_core_CallbackList();
		this.observers = new Map();
		this.revision = tink_state_internal_Revision._new();
	}
	getRevision() {
		return this.revision;
	}
	onInvalidate(i) {
		let _gthis = this;
		if(this.observers.get(i)) {
			return null;
		} else {
			this.observers.set(i,true);
			let _this = this.list;
			let this1;
			if(_this.disposeHandlers == null) {
				this1 = null;
			} else {
				let node = new tink_core__$Callback_ListCell(function(_) {
					i.invalidate();
				},_this);
				_this.cells.push(node);
				if(_this.used++ == 0) {
					let fn = _this.onfill;
					if(tink_core_Callback.depth < 500) {
						tink_core_Callback.depth++;
						fn();
						tink_core_Callback.depth--;
					} else {
						tink_core_Callback.defer(fn);
					}
				}
				this1 = node;
			}
			return new tink_core__$Callback_LinkPair(this1,new tink_core_SimpleLink(function() {
				return _gthis.observers.delete(i);
			}));
		}
	}
	fire() {
		this.revision = tink_state_internal_Revision._new();
		this.list.invoke(null);
	}
}
tink_state_internal_Invalidator.__name__ = true;
class tink_state__$Observable_Transform {
	static plain(f) {
		return f;
	}
}
class tink_state_State {
	static _new(value,comparator,guard,onStatusChange,toString) {
		return guard == null ? new tink_state__$State_SimpleState(value,comparator,onStatusChange,toString) : new tink_state__$State_GuardedState(value,guard,comparator,onStatusChange,toString);
	}
}
class tink_state__$State_SimpleState extends tink_state_internal_Invalidator {
	constructor(value,comparator,onStatusChange,toString) {
		if(tink_state_internal_Invalidator._hx_skip_constructor) {
			super();
			return;
		}
		tink_state_internal_Invalidator._hx_skip_constructor = true;
		super();
		tink_state_internal_Invalidator._hx_skip_constructor = false;
		this._hx_constructor(value,comparator,onStatusChange,toString);
	}
	_hx_constructor(value,comparator,onStatusChange,toString) {
		super._hx_constructor(toString);
		this.value = value;
		this.comparator = comparator;
		if(onStatusChange != null) {
			let _g = onStatusChange;
			let a1 = false;
			let tmp = function() {
				_g(a1);
			};
			this.list.ondrain = tmp;
			let _g1 = onStatusChange;
			let a11 = true;
			let tmp1 = function() {
				_g1(a11);
			};
			this.list.onfill = tmp1;
		}
	}
	getValue() {
		return this.value;
	}
	getComparator() {
		return this.comparator;
	}
}
tink_state__$State_SimpleState.__name__ = true;
class tink_state__$State_GuardedState extends tink_state__$State_SimpleState {
	constructor(value,guard,comparator,onStatusChange,toString) {
		tink_state_internal_Invalidator._hx_skip_constructor = true;
		super();
		tink_state_internal_Invalidator._hx_skip_constructor = false;
		this._hx_constructor(value,guard,comparator,onStatusChange,toString);
	}
	_hx_constructor(value,guard,comparator,onStatusChange,toString) {
		this.guardApplied = false;
		super._hx_constructor(value,comparator,onStatusChange,toString);
		this.guard = guard;
	}
	getValue() {
		if(!this.guardApplied) {
			this.guardApplied = true;
			return this.value = this.guard(this.value);
		} else {
			return this.value;
		}
	}
}
tink_state__$State_GuardedState.__name__ = true;
class tink_state_internal__$AutoObservable_Computation {
	static sync(f) {
		return function(_,_1) {
			return f();
		};
	}
}
class tink_state_internal__$AutoObservable_SubscriptionTo {
	constructor(source,cur,owner) {
		this.used = true;
		this.source = source;
		this.last = cur;
		this.lastRev = source.getRevision();
		this.owner = owner;
		if(owner.hot) {
			this.link = this.source.onInvalidate(this.owner);
		}
	}
}
tink_state_internal__$AutoObservable_SubscriptionTo.__name__ = true;
class tink_state_internal_AutoObservable extends tink_state_internal_Invalidator {
	constructor(compute,comparator,toString) {
		tink_state_internal_Invalidator._hx_skip_constructor = true;
		super();
		tink_state_internal_Invalidator._hx_skip_constructor = false;
		this._hx_constructor(compute,comparator,toString);
	}
	_hx_constructor(compute,comparator,toString) {
		this.sync = true;
		this.dependencies = new Map();
		this.last = null;
		this.status = 0;
		this.hot = false;
		super._hx_constructor(toString);
		this.compute = compute;
		this.comparator = comparator;
		let _gthis = this;
		this.list.onfill = function() {
			_gthis.getValue();
			_gthis.getRevision();
			if(_gthis.subscriptions != null) {
				let _g = 0;
				let _g1 = _gthis.subscriptions;
				while(_g < _g1.length) {
					let s = _g1[_g];
					++_g;
					s.link = s.source.onInvalidate(s.owner);
				}
			}
			_gthis.hot = true;
		};
		this.list.ondrain = function() {
			_gthis.hot = false;
			if(_gthis.subscriptions != null) {
				let _g = 0;
				let _g1 = _gthis.subscriptions;
				while(_g < _g1.length) {
					let this1 = _g1[_g++].link;
					if(this1 != null) {
						this1.cancel();
					}
				}
			}
		};
	}
	getRevision() {
		if(this.hot) {
			return this.revision;
		}
		if(this.subscriptions == null) {
			this.getValue();
		}
		let _g = 0;
		let _g1 = this.subscriptions;
		while(_g < _g1.length) if(_g1[_g++].source.getRevision() > this.revision) {
			return this.revision = tink_state_internal_Revision._new();
		}
		return this.revision;
	}
	subsValid() {
		if(this.subscriptions == null) {
			return false;
		}
		let _g = 0;
		let _g1 = this.subscriptions;
		while(_g < _g1.length) {
			let s = _g1[_g];
			++_g;
			if(s.source.getRevision() != s.lastRev) {
				return false;
			}
		}
		return true;
	}
	isValid() {
		if(this.status != 0) {
			if(!this.hot) {
				return this.subsValid();
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
	getComparator() {
		return this.comparator;
	}
	getValue() {
		let _gthis = this;
		let doCompute = function() {
			_gthis.status = 1;
			if(_gthis.subscriptions != null) {
				let _g = 0;
				let _g1 = _gthis.subscriptions;
				while(_g < _g1.length) _g1[_g++].used = false;
			}
			_gthis.subscriptions = [];
			_gthis.sync = true;
			let before = tink_state_internal_AutoObservable.cur;
			tink_state_internal_AutoObservable.cur = _gthis;
			let ret = _gthis.compute(function(v) {
				_gthis.update(v);
			});
			tink_state_internal_AutoObservable.cur = before;
			_gthis.last = ret;
			_gthis.sync = false;
		};
		let prevSubs = this.subscriptions;
		let count = 0;
		while(!this.isValid()) if(++count == tink_state_Observable.MAX_ITERATIONS) {
			throw haxe_Exception.thrown("no result after " + tink_state_Observable.MAX_ITERATIONS + " attempts");
		} else if(this.subscriptions != null) {
			let valid = true;
			let _g = 0;
			let _g1 = this.subscriptions;
			while(_g < _g1.length) {
				let s = _g1[_g];
				++_g;
				let nextRev = s.source.getRevision();
				let tmp;
				if(nextRev == s.lastRev) {
					tmp = false;
				} else {
					s.lastRev = nextRev;
					let before = s.last;
					let before1 = tink_state_internal_AutoObservable.cur;
					tink_state_internal_AutoObservable.cur = null;
					let ret = s.source.getValue();
					tink_state_internal_AutoObservable.cur = before1;
					s.last = ret;
					let this1 = s.source.getComparator();
					let a = s.last;
					tmp = !(this1 == null ? a == before : this1(a,before));
				}
				if(tmp) {
					valid = false;
					break;
				}
			}
			if(valid) {
				this.status = 1;
			} else {
				doCompute();
				if(prevSubs != null) {
					let _g = 0;
					while(_g < prevSubs.length) {
						let s = prevSubs[_g];
						++_g;
						if(!s.used) {
							if(this.hot) {
								let this1 = s.link;
								if(this1 != null) {
									this1.cancel();
								}
							}
							this.dependencies.delete(s.source);
						}
					}
				}
			}
		} else {
			doCompute();
		}
		return this.last;
	}
	update(value) {
		if(!this.sync) {
			this.last = value;
			this.fire();
		}
	}
	subscribeTo(source,cur) {
		let _g = this.dependencies.get(source);
		if(_g == null) {
			let sub = new tink_state_internal__$AutoObservable_SubscriptionTo(source,cur,this);
			this.dependencies.set(source,sub);
			this.subscriptions.push(sub);
		} else if(!_g.used) {
			_g.used = true;
			_g.last = cur;
			this.subscriptions.push(_g);
		}
	}
	invalidate() {
		if(this.status == 1) {
			this.status = 0;
			this.fire();
		}
	}
}
tink_state_internal_AutoObservable.__name__ = true;
class tink_state_internal_Revision {
	static _new() {
		return tink_state_internal_Revision.counter += 1.0;
	}
}
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
{
	String.__name__ = true;
	Array.__name__ = true;
}
haxe_Resource.content = [{ name : "releases.json", data : "Ww0KCXsNCgkJInZlcnNpb24iOiAiMS4xMS4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuMTEuMC13aW4uemlwIn0NCgkJXQ0KCX0sDQoJew0KCQkidmVyc2lvbiI6ICIxLjEwLjAiLA0KCQkiYXNzZXRzIjogWw0KCQkJeyJwbGF0Zm9ybSI6ICJXaW5kb3dzIiwgImZpbGUiOiAiaGwtMS4xMC4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuOS4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuOS4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuOC4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuOC4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuNy4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuNy4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuNi4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiTGludXgiLCAiZmlsZSI6ICJobC0xLjYuMC1saW51eC50Z3oifSwNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuNi4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuNS4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiTGludXgiLCAiZmlsZSI6ICJobC0xLjUuMC1saW51eC50Z3oifSwNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuNS4wLXdpbi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuNC4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuNC13aW4uemlwIn0NCgkJXQ0KCX0sDQoJew0KCQkidmVyc2lvbiI6ICIxLjMuMCIsDQoJCSJhc3NldHMiOiBbDQoJCQl7InBsYXRmb3JtIjogIk1hYyIsICJmaWxlIjogImhsLTEuMy1vc3gzMi56aXAifSwNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuMy13aW4zMi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuMi4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiTWFjIiwgImZpbGUiOiAiaGwtMS4yLW9zeC56aXAifSwNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuMi13aW4zMi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuMS4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuMS13aW4zMi56aXAifQ0KCQldDQoJfSwNCgl7DQoJCSJ2ZXJzaW9uIjogIjEuMC4wIiwNCgkJImFzc2V0cyI6IFsNCgkJCXsicGxhdGZvcm0iOiAiV2luZG93cyIsICJmaWxlIjogImhsLTEuMC13aW4zMi56aXAifQ0KCQldDQoJfQ0KXQ0K"}];
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = ({ }).toString;
tink_state_internal_Revision.counter = .0;
haxe_crypto_Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe_crypto_Base64.BYTES = haxe_io_Bytes.ofString(haxe_crypto_Base64.CHARS);
tink_pure__$List_Node.EMPTY = [];
tink_json_BasicParser.DBQT = String.fromCodePoint(34);
setup_$hashlink_Release.baseUrl = tink_Url.fromString("https://github.com/HaxeFoundation/hashlink/");
setup_$hashlink_Release.data = tink_pure_List.fromArray(new tink_json_Parser0().parse(haxe_Resource.getString("releases.json")));
tink_core_Callback.depth = 0;
tink_core_SimpleDisposable._hx_skip_constructor = false;
tink_core_Future.NEVER = new tink_core__$Future_NeverFuture();
tink_json_JsonString.BACKSLASH = "\\";
tink_parse_Char.WHITE = tink_parse_Char.oneOf([9,10,11,12,13,32]);
tink_parse_Char.LOWER = tink_parse_Char.ofRange(new IntIterator(97,123));
tink_parse_Char.DIGIT = tink_parse_Char.ofRange(new IntIterator(48,58));
tink_parse_StringSlice.CHARS = (function($this) {
	var $r;
	let _g = [];
	{
		let _g1 = 0;
		while(_g1 < 128) {
			let i = _g1++;
			_g.push(new tink_parse__$StringSlice_Data(String.fromCodePoint(i),0,1));
		}
	}
	$r = _g;
	return $r;
}(this));
tink_parse_StringSlice.EMPTY = new tink_parse__$StringSlice_Data("",0,0);
tink_semver_Parser.DOT = tink_parse_StringSlice.ofString(".");
tink_semver_Parser.HYPHEN = tink_parse_StringSlice.ofString("-");
tink_state_Observable.MAX_ITERATIONS = 100;
tink_state_internal_Invalidator._hx_skip_constructor = false;
setup_$hashlink_Program_main();
})(global);

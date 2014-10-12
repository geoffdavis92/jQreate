// jQreate.js

if (typeof Array.prototype.indexOf !== 'function') {
    Array.prototype.indexOf = function (item) {
        for(var i = 0; i < this.length; i++) {
            if (this[i] === item) {
                return i;
            }
        }
        return -1;
    }; 
}

window.doc = (function () {
    function Doc(els) {
        for(var i = 0; i < els.length; i++ ) {
            this[i] = els[i];
        }
        this.length = els.length;
    }
    // ========= UTILS =========
    // Doc = "~";
    
    Doc.prototype.map = function (callback) {
        var results = [];
        for (var i = 0; i < this.length; i++) {
            results.push(callback.call(this, this[i], i));
        }
        return results; //.length > 1 ? results : results[0];
    };

    Doc.prototype.forEach = function (callback) {
        this.map(callback);
        return this; 
    };

    Doc.prototype.mapOne = function (callback) {
        var m = this.map(callback);
        return m.length > 1 ? m : m[0];
    };

    // ========== DOM MANIPULATION ==========
    Doc.prototype.text = function (text) {
        if (typeof text !== "undefined") {
            return this.forEach(function (el) {
                el.innerText = text;
            });
        } else {
            return this.mapOne(function (el) {
                return el.innerText;
            });
        }
    };

    Doc.prototype.html = function (html) {
        if (typeof html !== "undefined") {
            return this.forEach(function (el) {
                el.innerHTML = html;
            });
        } else {
            return this.mapOne(function (el) {
                return el.innerHTML;
            });
        }
    };

    Doc.prototype.addClass = function (classes) {
        var className = "";
        if (typeof classes !== 'string') {
            for (var i = 0; i < classes.length; i++) {
               className += " " + classes[i];
            }
        } else {
            className = " " + classes;
        }
        return this.forEach(function (el) {
            el.className += className;
        });
    };

    Doc.prototype.removeClass = function (clazz) {
        return this.forEach(function (el) {
            var cs = el.className.split(' '), i;

            while ( (i = cs.indexOf(clazz)) > -1) { 
                cs = cs.slice(0, i).concat(cs.slice(++i));
            }
            el.className = cs.join(' ');
        });
    };

    Doc.prototype.attr = function (attr, val) {
        if (typeof val !== 'undefined') {
            return this.forEach(function(el) {
                el.setAttribute(attr, val);
            });
        } else {
            return this.mapOne(function (el) {
                return el.getAttribute(attr);
            });
        }
    };

    Doc.prototype.append = function (els) {
        return this.forEach(function (parEl, i) {
            els.forEach(function (childEl) {
                parEl.appendChild( (i > 0) ? childEl.cloneNode(true) : childEl);
            });
        });
    };

    Doc.prototype.prepend = function (els) {
        return this.forEach(function (parEl, i) {
            for (var j = els.length -1; j > -1; j--) {
                parEl.insertBefore((i > 0) ? els[j].cloneNode(true) : els[j], parEl.firstChild);
            }
        });
    };

    Doc.prototype.remove = function () {
        return this.forEach(function (el) {
            return el.parentNode.removeChild(el);
        });
    };

    Doc.prototype.on = (function () {
        if (document.addEventListener) {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el.addEventListener(evt, fn, false);
                });
            };
        } else if (document.attachEvent)  {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el.attachEvent("on" + evt, fn);
                });
            };
        } else {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el["on" + evt] = fn;
                });
            };
        }
    }());

    Doc.prototype.off = (function () {
        if (document.removeEventListener) {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el.removeEventListener(evt, fn, false);
                });
            };
        } else if (document.detachEvent)  {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el.detachEvent("on" + evt, fn);
                });
            };
        } else {
            return function (evt, fn) {
                return this.forEach(function (el) {
                    el["on" + evt] = null;
                });
            };
        }
    }());
    
    var doc = {
    	capp: function (tagName, id, parID, txt){ // Creates & appends elements, sets ID, initializes and sets text in textNodes
    		var body = document.getElementsByTagName('body')[0];
    		//body.setAttribute('id',"body");

    		var cVar = document.createElement(tagName);
    		if(id.length !== 0){
    			cVar.setAttribute('id', id);
    		}

    		if(parID === undefined || parID === null ){
    			document.body.appendChild(cVar);
    		}
    		else if(parID.length === 0){
    			//
    		}
    		else{
    			var parIDSel = document.getElementById(parID);
    			parIDSel.appendChild(cVar);
    		}
    		
    		if(txt !== undefined){
    			var getCVar = cVar;
    			var textNode = document.createTextNode(txt);
    			getCVar.appendChild(textNode);
    		}
            // if(code !== undefined){
            //     var getCVar = cVar;
            //     getCVar.innerHTML = code;
            // }
    		return doc;
    	},
        inner: function(toSetID, code){ // Standalone or chain with .capp()
            if(toSetID !== null || toSetID !== undefined){
                if(toSetID.length === 0){
                    console.log('Please set an ID');
                }
                else{
                    var setIt = document.getElementById(toSetID);
                    console.log(toSetID);
                    var theCode = code;
                    console.log(theCode);
                    setIt.innerHTML = code;
                }
            }
            else{

                // console.log.error("ID passed is not recognized.")
            }
        },
        get: function (selector) {
            var els;
            if (typeof selector === 'string') {
                els = document.querySelectorAll(selector);
            } else if (selector.length) { 
                els = selector;
            } else {
                els = [selector];
            }
            return new Doc(els);
        }, 
        create: function (tagName, attrs) {
            var el = new Doc([document.createElement(tagName)]);
            if (attrs) {
                if (attrs.className) { 
                    el.addClass(attrs.className);
                    delete attrs.className;
                }
                if (attrs.text) { 
                    el.text(attrs.text);
                    delete attrs.text;
                }
                for (var key in attrs) {
                    if (attrs.hasOwnProperty(key)) {
                        el.attr(key, attrs[key]);
                    }
                }
            }
            return el;
        }
    };
    return doc;
}());
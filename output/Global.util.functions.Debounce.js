Ext.data.JsonP.Global_util_functions_Debounce({"tagname":"class","name":"Global.util.functions.Debounce","autodetected":{},"files":[{"filename":"Debounce.js","href":"Debounce.html#Global-util-functions-Debounce"}],"extends":"Global.core.BaseClass","members":[{"name":"_applyConfig","tagname":"method","owner":"Global.core.BaseClass","id":"method-_applyConfig","meta":{"private":true}},{"name":"_executeAfter","tagname":"method","owner":"Global.util.functions.Debounce","id":"method-_executeAfter","meta":{"private":true}},{"name":"_executeBefore","tagname":"method","owner":"Global.util.functions.Debounce","id":"method-_executeBefore","meta":{"private":true}},{"name":"_switchExecute","tagname":"method","owner":"Global.util.functions.Debounce","id":"method-_switchExecute","meta":{"private":true}},{"name":"execute","tagname":"method","owner":"Global.util.functions.Debounce","id":"method-execute","meta":{}},{"name":"init","tagname":"method","owner":"Global.util.functions.Debounce","id":"method-init","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Global.util.functions.Debounce","short_doc":"debounce instance it is usefull to reduce functions call. ...","component":false,"superclasses":["Class","Global.core.BaseClass"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Class' rel='Class' class='docClass'>Class</a><div class='subclass '><a href='#!/api/Global.core.BaseClass' rel='Global.core.BaseClass' class='docClass'>Global.core.BaseClass</a><div class='subclass '><strong>Global.util.functions.Debounce</strong></div></div></div><h4>Files</h4><div class='dependency'><a href='source/Debounce.html#Global-util-functions-Debounce' target='_blank'>Debounce.js</a></div></pre><div class='doc-contents'><p>debounce instance it is usefull to reduce functions call.\nvar config = {\n            callback: console.log,\n            scope   : console,\n            interval: 1000\n        },\n        instance = <a href=\"#!/api/Global.util.functions.Debounce\" rel=\"Global.util.functions.Debounce\" class=\"docClass\">Global.util.functions.Debounce</a>(config);</p>\n\n<pre><code>window.addEventListener('resize', instance.execute);\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-_applyConfig' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Global.core.BaseClass' rel='Global.core.BaseClass' class='defined-in docClass'>Global.core.BaseClass</a><br/><a href='source/BaseClass.html#Global-core-BaseClass-method-_applyConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.core.BaseClass-method-_applyConfig' class='name expandable'>_applyConfig</a>( <span class='pre'>config</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-_executeAfter' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.functions.Debounce'>Global.util.functions.Debounce</span><br/><a href='source/Debounce.html#Global-util-functions-Debounce-method-_executeAfter' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.functions.Debounce-method-_executeAfter' class='name expandable'>_executeAfter</a>( <span class='pre'>callback, args, scope, interval</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callback</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>args</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>scope</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>interval</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-_executeBefore' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.functions.Debounce'>Global.util.functions.Debounce</span><br/><a href='source/Debounce.html#Global-util-functions-Debounce-method-_executeBefore' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.functions.Debounce-method-_executeBefore' class='name expandable'>_executeBefore</a>( <span class='pre'>callback, args, scope, interval</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>callback</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>args</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>scope</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li><li><span class='pre'>interval</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-_switchExecute' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.functions.Debounce'>Global.util.functions.Debounce</span><br/><a href='source/Debounce.html#Global-util-functions-Debounce-method-_switchExecute' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.functions.Debounce-method-_switchExecute' class='name expandable'>_switchExecute</a>( <span class='pre'>config</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-execute' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.functions.Debounce'>Global.util.functions.Debounce</span><br/><a href='source/Debounce.html#Global-util-functions-Debounce-method-execute' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.functions.Debounce-method-execute' class='name expandable'>execute</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Execute function you passed. ...</div><div class='long'><p>Execute function you passed.</p>\n</div></div></div><div id='method-init' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.functions.Debounce'>Global.util.functions.Debounce</span><br/><a href='source/Debounce.html#Global-util-functions-Debounce-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.functions.Debounce-method-init' class='name expandable'>init</a>( <span class='pre'>config</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>config of this class.</p>\n<ul><li><span class='pre'>callback</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>callback.</p>\n</div></li><li><span class='pre'>scope</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>scope of callback</p>\n</div></li><li><span class='pre'>interval</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>interval time. (ms) default is 1000ms.</p>\n</div></li><li><span class='pre'>immediate</span> : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a><div class='sub-desc'><p>wheter callback is execute immediate or not.</p>\n</div></li></ul></div></li></ul><p>Overrides: <a href=\"#!/api/Global.core.BaseClass-method-init\" rel=\"Global.core.BaseClass-method-init\" class=\"docClass\">Global.core.BaseClass.init</a></p></div></div></div></div></div></div></div>","meta":{}});
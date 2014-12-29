Ext.data.JsonP.Global_util_WindowScrollEventer({"tagname":"class","name":"Global.util.WindowScrollEventer","autodetected":{},"files":[{"filename":"WindowScrollEventer.js","href":"WindowScrollEventer.html#Global-util-WindowScrollEventer"}],"extends":"Global.ObservableClass","members":[{"name":"config","tagname":"property","owner":"Global.util.WindowScrollEventer","id":"property-config","meta":{}},{"name":"_applyConfig","tagname":"method","owner":"Global.core.BaseClass","id":"method-_applyConfig","meta":{"private":true}},{"name":"_judgeTrigger","tagname":"method","owner":"Global.util.WindowScrollEventer","id":"method-_judgeTrigger","meta":{"private":true}},{"name":"_onScroll","tagname":"method","owner":"Global.util.WindowScrollEventer","id":"method-_onScroll","meta":{"private":true}},{"name":"add","tagname":"method","owner":"Global.util.WindowScrollEventer","id":"method-add","meta":{}},{"name":"addEventListener","tagname":"method","owner":"Global.event.EventDispatcher","id":"method-addEventListener","meta":{}},{"name":"dispatchEvent","tagname":"method","owner":"Global.event.EventDispatcher","id":"method-dispatchEvent","meta":{}},{"name":"hasEventListener","tagname":"method","owner":"Global.event.EventDispatcher","id":"method-hasEventListener","meta":{}},{"name":"init","tagname":"method","owner":"Global.event.EventDispatcher","id":"method-init","meta":{}},{"name":"onesEventListener","tagname":"method","owner":"Global.event.EventDispatcher","id":"method-onesEventListener","meta":{}},{"name":"remove","tagname":"method","owner":"Global.util.WindowScrollEventer","id":"method-remove","meta":{}},{"name":"removeEventListener","tagname":"method","owner":"Global.event.EventDispatcher","id":"method-removeEventListener","meta":{}},{"name":"start","tagname":"method","owner":"Global.util.WindowScrollEventer","id":"method-start","meta":{}},{"name":"stop","tagname":"method","owner":"Global.util.WindowScrollEventer","id":"method-stop","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-Global.util.WindowScrollEventer","component":false,"superclasses":["Class","Global.core.BaseClass","Global.event.EventDispatcher","Global.core.ObservableClass"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/Class' rel='Class' class='docClass'>Class</a><div class='subclass '><a href='#!/api/Global.core.BaseClass' rel='Global.core.BaseClass' class='docClass'>Global.core.BaseClass</a><div class='subclass '><a href='#!/api/Global.event.EventDispatcher' rel='Global.event.EventDispatcher' class='docClass'>Global.event.EventDispatcher</a><div class='subclass '><a href='#!/api/Global.core.ObservableClass' rel='Global.core.ObservableClass' class='docClass'>Global.core.ObservableClass</a><div class='subclass '><strong>Global.util.WindowScrollEventer</strong></div></div></div></div></div><h4>Files</h4><div class='dependency'><a href='source/WindowScrollEventer.html#Global-util-WindowScrollEventer' target='_blank'>WindowScrollEventer.js</a></div></pre><div class='doc-contents'><p>This tis a EventDispatcher the event depends on the top position of the element\n,</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-config' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.WindowScrollEventer'>Global.util.WindowScrollEventer</span><br/><a href='source/WindowScrollEventer.html#Global-util-WindowScrollEventer-property-config' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.WindowScrollEventer-property-config' class='name expandable'>config</a> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a>[]<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<ul><li><span class='pre'>$elm</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>target element.</p>\n</div></li><li><span class='pre'>name</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>event name</p>\n</div></li></ul></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-_applyConfig' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Global.core.BaseClass' rel='Global.core.BaseClass' class='defined-in docClass'>Global.core.BaseClass</a><br/><a href='source/BaseClass.html#Global-core-BaseClass-method-_applyConfig' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.core.BaseClass-method-_applyConfig' class='name expandable'>_applyConfig</a>( <span class='pre'>config</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-_judgeTrigger' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.WindowScrollEventer'>Global.util.WindowScrollEventer</span><br/><a href='source/WindowScrollEventer.html#Global-util-WindowScrollEventer-method-_judgeTrigger' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.WindowScrollEventer-method-_judgeTrigger' class='name expandable'>_judgeTrigger</a>( <span class='pre'>targets</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>targets</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-_onScroll' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.WindowScrollEventer'>Global.util.WindowScrollEventer</span><br/><a href='source/WindowScrollEventer.html#Global-util-WindowScrollEventer-method-_onScroll' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.WindowScrollEventer-method-_onScroll' class='name expandable'>_onScroll</a>( <span class='pre'></span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-add' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.WindowScrollEventer'>Global.util.WindowScrollEventer</span><br/><a href='source/WindowScrollEventer.html#Global-util-WindowScrollEventer-method-add' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.WindowScrollEventer-method-add' class='name expandable'>add</a>( <span class='pre'>targets</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>targets</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-addEventListener' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Global.event.EventDispatcher' rel='Global.event.EventDispatcher' class='defined-in docClass'>Global.event.EventDispatcher</a><br/><a href='source/EventDispatcher.html#Global-event-EventDispatcher-method-addEventListener' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.event.EventDispatcher-method-addEventListener' class='name expandable'>addEventListener</a>( <span class='pre'>type, listener</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Add listener ...</div><div class='long'><p>Add listener</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>Event type</p>\n</div></li><li><span class='pre'>listener</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>Callback function</p>\n</div></li></ul></div></div></div><div id='method-dispatchEvent' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Global.event.EventDispatcher' rel='Global.event.EventDispatcher' class='defined-in docClass'>Global.event.EventDispatcher</a><br/><a href='source/EventDispatcher.html#Global-event-EventDispatcher-method-dispatchEvent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.event.EventDispatcher-method-dispatchEvent' class='name expandable'>dispatchEvent</a>( <span class='pre'>type, data</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Dispatch event message. ...</div><div class='long'><p>Dispatch event message.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>Event type</p>\n</div></li><li><span class='pre'>data</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'><p>Attach data</p>\n</div></li></ul></div></div></div><div id='method-hasEventListener' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Global.event.EventDispatcher' rel='Global.event.EventDispatcher' class='defined-in docClass'>Global.event.EventDispatcher</a><br/><a href='source/EventDispatcher.html#Global-event-EventDispatcher-method-hasEventListener' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.event.EventDispatcher-method-hasEventListener' class='name expandable'>hasEventListener</a>( <span class='pre'>type</span> ) : <a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Return true this class listens passed type of event. ...</div><div class='long'><p>Return true this class listens passed type of event.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>Event type</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Boolean\" rel=\"Boolean\" class=\"docClass\">Boolean</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-init' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Global.event.EventDispatcher' rel='Global.event.EventDispatcher' class='defined-in docClass'>Global.event.EventDispatcher</a><br/><a href='source/EventDispatcher.html#Global-event-EventDispatcher-method-init' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.event.EventDispatcher-method-init' class='name expandable'>init</a>( <span class='pre'>config</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul><p>Overrides: <a href=\"#!/api/Global.core.BaseClass-method-init\" rel=\"Global.core.BaseClass-method-init\" class=\"docClass\">Global.core.BaseClass.init</a></p></div></div></div><div id='method-onesEventListener' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Global.event.EventDispatcher' rel='Global.event.EventDispatcher' class='defined-in docClass'>Global.event.EventDispatcher</a><br/><a href='source/EventDispatcher.html#Global-event-EventDispatcher-method-onesEventListener' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.event.EventDispatcher-method-onesEventListener' class='name expandable'>onesEventListener</a>( <span class='pre'>type, listener</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Event you passed is only called once. ...</div><div class='long'><p>Event you passed is only called once.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>Event type</p>\n</div></li><li><span class='pre'>listener</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>Callback function</p>\n</div></li></ul></div></div></div><div id='method-remove' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.WindowScrollEventer'>Global.util.WindowScrollEventer</span><br/><a href='source/WindowScrollEventer.html#Global-util-WindowScrollEventer-method-remove' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.WindowScrollEventer-method-remove' class='name expandable'>remove</a>( <span class='pre'>name</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>name</span> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><div class='sub-desc'></div></li></ul></div></div></div><div id='method-removeEventListener' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/Global.event.EventDispatcher' rel='Global.event.EventDispatcher' class='defined-in docClass'>Global.event.EventDispatcher</a><br/><a href='source/EventDispatcher.html#Global-event-EventDispatcher-method-removeEventListener' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.event.EventDispatcher-method-removeEventListener' class='name expandable'>removeEventListener</a>( <span class='pre'>type, listener</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Remove listener ...</div><div class='long'><p>Remove listener</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>type</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>Event type</p>\n</div></li><li><span class='pre'>listener</span> : <a href=\"#!/api/Function\" rel=\"Function\" class=\"docClass\">Function</a><div class='sub-desc'><p>Callback function</p>\n</div></li></ul></div></div></div><div id='method-start' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.WindowScrollEventer'>Global.util.WindowScrollEventer</span><br/><a href='source/WindowScrollEventer.html#Global-util-WindowScrollEventer-method-start' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.WindowScrollEventer-method-start' class='name expandable'>start</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div><div id='method-stop' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Global.util.WindowScrollEventer'>Global.util.WindowScrollEventer</span><br/><a href='source/WindowScrollEventer.html#Global-util-WindowScrollEventer-method-stop' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Global.util.WindowScrollEventer-method-stop' class='name expandable'>stop</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n</div></div></div></div></div></div></div>","meta":{}});
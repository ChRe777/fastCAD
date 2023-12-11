// attribute.js

// Imports
//
import mustache from 'wontache';

// Bootstrap supports all the HTML5 input types: 
//    * text, password, datetime, datetime-local, 
//    * date, month, time, week, number, email, url, search, tel, and color.

const attrText = `
<span id="{{name}}-label" class="input-group-text" for="{{name}}" :style="{ width: labelWidth + 'px' }">{{title}}</span>
<input type="text" class="form-control text-truncate" id="{{name}}" v-model="editingAttributes['{{name}}']" />
`

const attrLongText = `
<span id="{{name}}-label" class="input-group-text" for="{{name}}" :style="{ width: labelWidth + 'px' }">{{title}}</span>
<textarea id="{{name}}" class="form-control" v-model="editingAttributes['{{name}}']"></textarea>
`

// see https://vuejs.org/guide/essentials/forms.html#number

const attrNumber = `
<span id="{{name}}-label" class="input-group-text" for="{{name}}" :style="{ width: labelWidth + 'px' }">{{title}}</span>
<input lang="en" type="number" class="form-control" id="{{name}}" v-model.number="editingAttributes['{{name}}']" />
`

const attrOpacity = `
<span id="{{name}}-label" class="input-group-text" for="{{name}}" :style="{ width: labelWidth + 'px' }">{{title}}</span>
<input lang="en" min="0" max="1" step="0.1" type="number" class="form-control" id="{{name}}" v-model.number="editingAttributes['{{name}}']" />
`

const attrColor = `
<span id="{{name}}-label" class="input-group-text" for="{{name}}" :style="{ width: labelWidth + 'px' }">{{title}}</span>
<input type="color" class="form-control form-control-color" id="{{name}}" v-model.number="editingAttributes['{{name}}']" />
`

// see https://stackoverflow.com/questions/3368837/list-every-font-a-users-browser-can-display

// TODO: REFACTOR WITHOUT MUSTACHE

const attrFont = `
<span id="{{name}}-label" class="input-group-text" for="{{name}}" :style="{ width: labelWidth + 'px' }">{{title}}</span>
<select class="form-select form-select-sm" id="{{name}}" v-model="editingAttributes['{{name}}']" >
    <option v-for="font in fonts" :value="font">
        {{=<% %>=}}
        {{font}}
        <%={{ }}=%>
    </option>
</select>
`

const editorTemplate = `
<h5>{{title}}</h5>
{{#groups}}
    <div class="input-group input-group-sm mb-2">
    {{#.}}
        {{>*type}}
    {{/.}}
    </div>
{{/groups}}
`

const typeTemplates = {
    'text': attrText, // 'a text' 
    'long-text': attrLongText, // 'a long text' 
    'number': attrNumber, // eg. 100, 123.4 - https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#number
    'font': attrFont, // e.g. Arial, San serif ...
    'url': attrText, // e.g. http://img.com/img.png - https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#url
    'color': attrColor, // e.g. #ff00ff - https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#color
    'length': attrText, // e.g. 30px, 1em, 3rem, ... -https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#length
    'angle': attrText, // e.g. 5deg, 10grad, 0.5 rad - https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#angle
    'opacity': attrOpacity // e.g. 0.5 - https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#opacity_value
}

// render the template
//
export function renderGroups(groups) {
    const renderFn = mustache(editorTemplate)
    const template = renderFn(groups, { partials: typeTemplates })
    return template
}

Vue.component('my-button',{
    data:function () {
        return {
            buttonValue:this.value
        }
    },
    props:{
        value:{
            type:Number,
            default:1
        }
    },
    template:'<div id="myBtn">' +
             '    <slot></slot>' +
             '</div>',
 
    methods:{
 
    }
})
Vue.component('survey',{
    data:function () {
        return{
            currentValue:this.value,
            nextStepBtn:true,
            submitBtn:true
        }
    },
    props:{
        surveys:{
            type:Object,
            default:''
        },
        value:{
            type:Number,
            default:1
        },
        sex:{
            type:Number,
            default:Infinity
        },
        hobby:{
            type:Array,
            default:[]
        },
        introduce:{
            type:String,
            default:'',
            minLength:100
        },
        activeColor:{
            type:String,
            default:'activeColor'
        },
        disableColor:{
            type:String,
            default:'disableColor'
        }
    },
    template:'<div>' +
            '   <div id="title">' +
            '       <slot  name="surveyTitle" v-for="survey in surveys" :survey-id="survey.id" :survey-type="survey.type" :survey-topic="survey.topic" :survey-title="survey.title" :survey-value="survey.value"></slot>' +
            '   </div>' +
            '   <my-button v-model="currentValue">' +
            '        <button :class="activeColor" v-if="currentValue <= surveys.length && currentValue != 1" @click="upStep(currentValue-2)">上一步</button>' +
            '        <button :class="[nextStepBtn?disableColor:activeColor]" v-if="currentValue != surveys.length" :disabled="nextStepBtn" @click="nextStep(currentValue)">下一步</button>' +
            '        <button @click="reset">重置</button>' +
            '        <button v-if="currentValue == surveys.length" :disabled="submitBtn" @click="submit">提交</button>' +
            '    </my-button>'+
            '</div>',
    methods:{
        nextStep:function (id) {
            this.checkStatus(id);
            this.currentValue ++;
        },
        upStep:function (id) {
            this.checkStatus(id);
            this.currentValue --;
        },
        reset:function () {
            this.$parent.sex = '';
            this.$parent.hobby = [];
            this.$parent.introduce = '';
            alert("重置成功")
        },
        submit:function () {
            let sex = this.$parent.sex;
            let hobby = this.$parent.hobby;
            let introduce = this.$parent.introduce;
            alert("提交:\rsex:" + sex + "\rhobby:" + hobby + "\rintroduce" + introduce);
        },
        //优化下一步按钮是否置灰问题
        checkStatus:function (id) {
            if('hobby' == this.surveys[id].topic){
                if(this.hobby.length<2 || this.hobby.length > 3){
                    this.nextStepBtn = true;
                }else{
                    this.nextStepBtn = false;
                }
            }else if('sex' == this.surveys[id].topic){
                if(this.sex.length > 0){
                    this.nextStepBtn = false;
                }else{
                    this.nextStepBtn = true;
                }
            }
        }
    },
    created:function(){
        this.nextStepBtn = true;
    },
    watch:{
        currentValue:function (val) {
            this.$emit('input',val);
        },
        sex:function () {
            if(this.sex.length > 0){
                this.nextStepBtn = false;
            }
        },
        hobby:function(){
            if(this.hobby.length<2 || this.hobby.length > 3){
                this.nextStepBtn = true;
            }else{
                this.nextStepBtn = false;
            }
        },
        introduce:function (val) {
            if(val.length>100){
                this.submitBtn = false;
            }
        },
        nextStepBtn:function(){
 
        }
    }
})
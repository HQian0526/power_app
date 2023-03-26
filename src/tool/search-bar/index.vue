<template>
    <el-card class="search-wrapper">
        <el-row>
            <el-col :span="config.btnSpan?(24-config.btnSpan):20">
                <el-form ref="form" :lable-width="config.lableWidth||'105px'">
                    <el-row>
                        <el-col v-for="(item,index) in config.formRowFirst" :key="index" :span="item.span?item.span:item.keyTwo?12:6">
                            <el-form-item :label="item.label">
                                <el-date-picker
                                    v-if="item.mode === 'date'"
                                    v-model="form[item.key]"
                                    :placeholder="`请选择${item.label}`"
                                    :type="item.type"
                                    style="width: 100%;"
                                    :value-format="item.format"
                                    clearable
                                />
                                <el-input
                                    v-if="item.mode==='input'"
                                    v-model.trim="form[item.key]"
                                    :style="{width: item.width?item.width:'100%'}"
                                    :placeholder="item.labelKey?`请输入${item.labelKey}`:`请输入${item.label}`"
                                    :disabled="item.disabled?item.disabled:false"
                                    clearable
                                />
                                <div v-if="item.mode==='data-picker'">
                                    <el-date-picker
                                        v-model="form[item.key]"
                                        :type="item.type"
                                        placeholder="请选择开始时间"
                                        :value-format="item.format"
                                        :style="{width:item.span?item.width?item.width:'243px':clientWidth>1600?'200px':'195px'}"
                                        clearable
                                    />
                                    <span style="margin:0 3px">至</span>
                                    <el-date-picker
                                        v-model="form[item.keyTwo]"
                                        :type="item.type"
                                        placeholder="请选择结束时间"
                                        :value-format="item.format"
                                        :style="{width:item.span?item.width?item.width:'243px':clientWidth>1600?'200px':'195px'}"
                                        clearable
                                    />
                                </div>
                                <div v-if="item.mode==='data-time'">
                                    <el-date-picker
                                        v-model="form[item.key]"
                                        type="datetime"
                                        placeholder="请选择开始时间"
                                        :value-format="item.format"
                                        :style="{width:clientWidth>1600?'200px':'195px'}"
                                        clearable
                                    />
                                    <span style="margin:0 3px">至</span>
                                    <el-date-picker
                                        v-model="form[item.keyTwo]"
                                        type="datetime"
                                        placeholder="请选择结束时间"
                                        :value-format="item.format"
                                        :style="{width:clientWidth>1600?'200px':'195px'}"
                                        clearable
                                    />
                                </div>
                                <el-select
                                    v-if="item.mode==='select'"
                                    v-model="form[item.key]"
                                    :style="{width:item.width?item.width:'100%'}"
                                    :placeholder="`请选择${item.label}`"
                                    clearable
                                >
                                    <el-option v-for="(opt, optIndex) in item.list" :key="optIndex" :label="opt.label" :value="opt.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-for="(item,index) in config.formRowSecond||[]" :key="index" :span="item.span?item.span:item.keyTwo?12:6">
                            <el-form-item :label="item.label">
                                <el-date-picker
                                    v-if="item.mode === 'date'"
                                    v-model="form[item.key]"
                                    :placeholder="`请选择${item.label}`"
                                    :type="item.type"
                                    style="width: 100%;"
                                    :value-format="item.format"
                                    clearable
                                />
                                <el-input
                                    v-if="item.mode==='input'"
                                    v-model.trim="form[item.key]"
                                    :style="{width: item.width?item.width:'100%'}"
                                    :placeholder="item.labelKey?`请输入${item.labelKey}`:`请输入${item.label}`"
                                    :disabled="item.disabled?item.disabled:false"
                                    clearable
                                />
                                <div v-if="item.mode==='data-picker'">
                                    <el-date-picker
                                        v-model="form[item.key]"
                                        :type="item.type"
                                        placeholder="请选择开始时间"
                                        :value-format="item.format"
                                        :style="{width:item.span?item.width?item.width:'243px':clientWidth>1600?'200px':'195px'}"
                                        clearable
                                    />
                                    <span style="margin:0 3px">至</span>
                                    <el-date-picker
                                        v-model="form[item.keyTwo]"
                                        :type="item.type"
                                        placeholder="请选择结束时间"
                                        :value-format="item.format"
                                        :style="{width:item.span?item.width?item.width:'243px':clientWidth>1600?'200px':'195px'}"
                                        clearable
                                    />
                                </div>
                                <div v-if="item.mode==='data-time'">
                                    <el-date-picker
                                        v-model="form[item.key]"
                                        type="datetime"
                                        placeholder="请选择开始时间"
                                        :value-format="item.format"
                                        :style="{width:clientWidth>1600?'200px':'195px'}"
                                        clearable
                                    />
                                    <span style="margin:0 3px">至</span>
                                    <el-date-picker
                                        v-model="form[item.keyTwo]"
                                        type="datetime"
                                        placeholder="请选择结束时间"
                                        :value-format="item.format"
                                        :style="{width:clientWidth>1600?'200px':'195px'}"
                                        clearable
                                    />
                                </div>
                                <el-select
                                    v-if="item.mode==='select'"
                                    v-model="form[item.key]"
                                    :style="{width:item.width?item.width:'100%'}"
                                    :placeholder="`请选择${item.label}`"
                                    clearable
                                >
                                    <el-option v-for="(opt, optIndex) in item.list" :key="optIndex" :label="opt.label" :value="opt.value" />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
            <el-col :span="config.btnSpan?config.btnSpan:4">
                <div class="btn-wrapper">
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                    <el-button type="info" @click="handleClear">重置</el-button>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
export default{
    name:'search',
    props:{
        config:{
            type:Object,
            default:()=>{}
        }
    },
    data(){
        return{
            form:{},
            clientWidth:0
        }
    },
    created(){
        this.initForm();
    },
    mounted(){
        this.onReSize()
    },
    methods:{
        //监听宽度变化
        onReSize() {
            this.clientWidth = document.body.clientWidth;
            window.onresize = () => {
                return (()=>{
                    this.clientWidth = document.body.clientWidth
                })
            }
        },
        //遍历config生成form
        initForm() {
            this.form = this.generateForm();
        },
        generateForm(){
            const form = {}
            this.config.formRowFirst.forEach((item) => {
                form[item.key] = '';
                if(item.keyTwo)form[item.keyTwo] = ""
            })
            if(this.config.formRowSecond){
                this.config.formRowSecond.forEach((item) => {
                    form[item.key] = '';
                    if(item.keyTwo)form[item.keyTwo] = ""
                })
            }
            return form
        },
        handleSearch() {
            const params = {}
            const generateForm = this.generateForm()
            const keys = Object.keys(this.form)
            keys.forEach(key=>{
                if(Array.isArray(this.form[key])) {
                    if(this.form[key].length>0){
                        params[key+'Start'] = this.form[key][0]
                        params[key+'End'] = this.form[key][1]
                    }else{
                        params[key+'Start'] = ''
                        params[key+'End'] = ''
                    }
                }else if(this.form[key]===null && Array.isArray(generateForm[key])){
                    params[key+'Start'] = ''
                    params[key+'End'] = ''
                }else{
                    params[key] = this.form[key]
                }
            })
            console.log("search",params);
            this.$emit('search',params)
        },
        handleClear(){
            this.initForm();
            this.$emit('reset')
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/.el-card__body {
    padding:20px 10px 0px;
}
/deep/.el-range-separator {
    line-height: 22px !important;
    position: relative;
    left:0px;
    top:1px;
}
.btn-wrapper{
    display: flex;
    justify-content: flex-end;
}
</style>
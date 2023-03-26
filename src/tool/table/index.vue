<template>
    <el-table
        ref="CsgTable"
        v-loading="loading"
        :border="border"
        style="width: 100%;"
        :highlight-current-row="highlightCurrentRow"
        :data="data"
        :row-key="reserveSection?rowKey:null"
        @selection-change="handleSelectionChange"
        :stripe="stripe"
    >
        <el-table-column v-if="checkboxVisible" type="selection" width="50" :reserve-selection="reserveSecion"/>
        <el-table-column v-else-if="indexVisible" width="50" label="序号" type="index" />
        <el-table-column
            v-for="(item,index) in tableColumnProps"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :align="item.align?item.align:'center'"
            header-align="center"
            :show-overflow-tooltip="item.tooltip"
            :formatter="item.formatter"
            :min-width="item.minWidth"
            :width="item.width"
            :fixed="item.fixed?item.fixed:false"
        >
            <template slot-scope="scope">
                <!-- 自定义操作按钮 -->
                <div v-if="item.customOperate">
                    <template v-for="(btnItem,btnIndex) in item.operationList">
                        <el-button
                            v-if="handleIsShow(btnItem.isShow,scope.row,btnItem.name)"
                            :key="btnIndex"
                            :disabled="handleIsDisabled(btnItem.isDisabled,scope.row,btnItem.name)"
                            type="text"
                            @click="handleCustomClick(btnItem.clickFun,scope.row)"
                        >
                            {{ btnItem.name }}
                        </el-button>
                    </template>
                </div>
                <!-- 文字操作按钮（非button） -->
                <span v-if="item.textOperate" class="text-operate" @click="item.clickFun(scope.row)">
                    {{ scope.row[item.prop] | handleFilter(item.filterFun) }}
                </span>
                <!-- 正常展示表单 -->
                <span v-else>
                    {{ scope.row[item.prop] | handleFilter(item.filterFun) }}
                </span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    name:"table",
    filters:{
        handleFiter(val,func) {
            if(typeof(func)==='function')return func(val);
            return val
        }
    },
    data(){
        return{
            indexNum:0,
            showImg:false
        }
    },
    props:{
        rowStyle:{
            type:String,
            default:''
        },
        border:{
            type:Boolean,
            default:true
        },
        stripe:{
            type:Boolean,
            default:false
        },
        reserveSection:{
            type:Boolean,
            default:false
        },
        rowKey:{
            type:Function,
            default:()=>''
        },
        // 表单loading
        loading:{
            type:Boolean,
            default:false
        },
        // 是否支持单选
        highlightCurrentRow:{
            type:Boolean,
            default:false,
        },
        // 是否展示多选框
        checkboxVisible:{
            type:Boolean,
            default:false
        },
        // 是否展示序号
        indexVisible:{
            type:Boolean,
            default:false
        },
        // table-column的配置
        tableColumnProps:{
            type:Array,
            default:()=>[]
        },
        //表单数据
        data:{
            type:Array,
            default:()=>[]
        }
    },
    mounted(){
        console.log("tableColumnProps",this.tableColumnProps);
    },
    methods:{
        handleSelectionChange(){
            this.$emit("selection-change",val)
        },
        // 控制操作列操作项的显示
        handleIsShow(func,row,typeName) {
            if(typeof(func)==="function")return func(row,typeName);
        },
        // 控制操作列是否禁用
        handleDisabled(func, row, typeName) {
            if(typeof(func) === 'function')return func(row,typeName);
        },
        //自定义操作按钮
        handleCustomClick(func, row){
            return func.bind(this)(row);
        },
        //清除多选
        clearMultipleSelect() {
            this.$refs.CsgTable.clearSelection()
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el__fixed-right{
    height:100% !important;
}
.content{
    text-align: left;
}
.el-table .cells{
    white-space: pre-line !important;
}
.text-operate{
    display: inline-block;
    color:#3366ff;
    cursor:pointer;
    width:100%;
    height:100%;
}
</style>
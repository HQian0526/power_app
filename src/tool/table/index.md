<!-- 页面上 -->
<Table
    style="margin-top:10px"
    :loading="tableLoading"
    indexVisible
    :data="rowInfoList"
    :table-column-props="tableConfig"
    @selection-change="selectionChange"
/>
<div class="footer-wrapper">
    <el-pagination
        :current-page="formInline.pageNum"
        :page-size="formInline.pageSize"
        :page-sizes="[10,20,30,40,50]"
        layout="total,sizes,prev,next,jumper"
        :total="dataAll"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
</div>
import {search_config} from '@/views/xxxxxxxxx'
import {mixins} from '@/views/xxxxxxxxx'

mixins:[mixins]
data(){
    return{
        searchConfig:search_config
    }
}
methods:{
    initFormInline(){
        this.formInline = {
            request1:"",
            request2:"",
            request3:"",
            pageNum:1,
            pageSize:10
        }
    },
    //选择列表数据
    selectionChange(val){
        this.selectList = val;
    },
    //切换每页展示条数
    selectionChange(val){
        this.formInline.pageSize = val;
        this.queryList(this.formInline)
    },
    //切换页码
    handleCurrentChange(val){
        this.formInline.pageNum = val;
        this.queryList(this.formInline)
    },
}


<!-- mixins.js   start-->
import {SearchBar} from '@/views/xxxxxxxxx'
import {Table} from '@/views/xxxxxxxxx'
export const mixins = {
    components:{
        SearchBar,
        Table
    }
}
<!-- end -->
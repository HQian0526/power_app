<!-- 页面上 -->
<SearchBar
    ref="searchData"
    :config="searchConfig"
    @search="handleSearch"
    @reset="handleReset"
/>

import {search_config} from '@/views/xxxxxxxxx'

data(){
    return{
        searchConfig:search_config
    }
}
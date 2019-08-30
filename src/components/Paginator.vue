<template>
    <div id="paginator">
        <!-- {{ pagina }} {{ itensPagina }} {{ totalItens }} -->
        <button class="marginl0 marginr0 paginatorEl" type="button" @click="firstPage">1</button>
        <button class="marginl0 marginr0 paginatorEl" type="button" @click="previousPage"><</button>
        <input class="paginatorEl" v-model="pagina" style="text-align: center; border-radius: 0px;">
        <button class="marginl0 marginr0 paginatorEl" type="button" @click="nextPage">></button>
        <button class="marginl0 marginr0 paginatorEl" type="button" @click="lastPage">{{ totalPaginas }}</button>
    </div>
</template>

<script>
export default {
    name: "Paginator",
    props:{
        pagina: Number,
        itensPagina: Number,
        totalItens: Number,
    },
    computed: {
        // pagina: function(e) {
        //     this.updateTotalPaginas();
        // },
        totalPaginas: function(){
            console.log('called');
            return Math.ceil(this.totalItens/this.itensPagina);
        }
    },
    methods: {
        nextPage: function(){
            if (this.pagina < this.totalPaginas){
                this.$emit('pagina', parseInt(this.pagina) + 1);
            }
        },
        previousPage: function(){
            if (this.pagina > 1){
                this.$emit('pagina', parseInt(this.pagina) - 1);
            }
        },
        firstPage: function(){
            this.$emit('pagina', 1);
        },
        lastPage: function(){
            this.$emit('pagina', this.totalPaginas);
        },
    }
};
</script>

<style>
#paginator{
    margin: auto 0px auto auto;
}
.paginatorEl{
    width: 45px;
    height: 45px;
    font-size: 12px;
    /* padding: auto;
    margin: auto;
    box-sizing: border-box; */
}
</style>
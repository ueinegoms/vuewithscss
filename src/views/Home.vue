<template>
  <div class="home">
    <h2 class="corForte">Proprietários</h2>
    <div class="m4 b5 vb6" id="tabela">
      <table>
        <tr>
          <th
            v-for="itemCabecalho in tableContent.cabecalho"
            :key="itemCabecalho.id"
            :style="itemCabecalho.style"
          >{{itemCabecalho.valor}}</th>
        </tr>

        <router-link
          :to="'/properties/'+item.id"
          tag="tr"
          v-for="item in itensArray"
          :key="item.id"
        >
          <td style="text-align: center">{{item.id}}</td>
          <td style="cursor: pointer">
            <div>{{item.name}}</div>
          </td>
          <td>{{item.cpf}}</td>
        </router-link>
      </table>
      <div>
        <Paginator
          @pagina="atualizarPagina"
          :pagina="pagina"
          :itensPagina="itensPagina"
          :totalItens="totalItens"
          v-if="totalItens != ''"
        />
      </div>
    </div>
  </div>
</template>

<script>
import connector from '@/connector.js'
// @ is an alias to /src
import Paginator from "@/components/Paginator.vue";

export default {
  name: "home",
  components: {
    Paginator,
  },
  props: {
    tableContent: {
      type: Object,
      default: () => {
        return {
          // cabeçalho
          cabecalho: [
            { id: 0, valor: "#", style: "text-align: center" },
            { id: 1, valor: "Nome", style: "" },
            { id: 2, valor: "CPF", style: "" },
          ]
          // conteúdo
          // agora refere à itensArray
        };
      }
    }
  },
  data() {
      return {
          pagina: 1,
          itensPagina: 6,
          totalItens: "",
          query: "",
          itensArray: [],
          pesquisa: "",
          pesquisaTexto: true,
          // checkbox: {pesquisarInativo: false},
      };
  },
  mounted: function() {
      this.itensPagina = this.getItensPerPageByWindowSize();
      if (this.itensPagina < 4){
          this.itensPagina = 4;
      }
      this.mountList();
      // document.getElementById('focus').focus();
      // document.getElementById('focus').select();
  },
  methods: {
    getItensPerPageByWindowSize: function(){
        let vH = window.innerHeight;           
        let tabela = document.getElementById('tabela');
        let hOutros = 0;
        let pronto = false;
        let i = 0;
        while (pronto == false) {
            if(tabela.parentElement.children[i] == tabela){
                pronto = true;
            } else {
                hOutros += tabela.parentElement.children[i].offsetHeight;
            }
            i ++;
        }
        
        // mobile
        if (window.innerHeight > window.innerWidth){
            if (window.innerWidth <= 420){
                return Math.floor((vH-(56+12+hOutros+46+6+6+45+6+56))/46);
            }
            return Math.floor((vH-(56+12+hOutros+46+6+6+45+6))/46);
        } else {
            // desktop
            return Math.floor((vH-(56+12+hOutros+46+6+6+45+6))/68);
        }
    },
    mountList: async function() {
        // const { dispatch } = this.$store;
        connector.interceptor('https://my-json-server.typicode.com/pedroskakum/fake-api/grower', null, 'GET').then(e => {
          this.itensArray = e;
          this.totalItens = e.length;
          this.$emit('loading', false);
        });
        const { query, pagina, itensPagina } = this;
        this.$emit('loading', true);
    },
    atualizarPagina: function(e){
        this.pagina = e;
    },
    searchHasChanged: function(val){
        if (isNaN(parseInt(val))){
            // se for texto
            console.log('TEXTO');
            this.pesquisaTexto = true;
            } else {
            // se for número
            console.log('NÚMERO');
            this.pesquisaTexto = false;
        }
    },
    criarQueryPesquisar: function(){
        let actualQuery = new URLSearchParams();
        if (this.pesquisaTexto){
            actualQuery.append('nome', this.pesquisa);
        } else {
            actualQuery.append('id', this.pesquisa);
        }
        if (this.checkbox['pesquisarInativo'] == true){
            actualQuery.append('exibir-inativos', 'on');
        }
        this.query = `&${actualQuery}`;
        this.pagina = 1;
        this.mountList();
    },
  }
};
</script>

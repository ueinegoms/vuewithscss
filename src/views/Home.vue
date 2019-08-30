<template>
  <div class="home contentVertical">
    <div style="display: flex; flex-direction: row; align-items: center">
      <h2 class="corForte" style="display: inline-block">Proprietários</h2>
      <!-- <i class="material-icons successIcon fakeButton" style="margin-left: 16px;">add_circle</i> -->
      <router-link tag="i" to="/grower" class="material-icons successIcon fakeButton" style="margin-left: 16px">add_circle</router-link>
    </div>
    <div class="contentHorizontal">
      <div style="width: 75%">
        <input
          style="width: calc(100% - 4px)"
          id="focus"
          type="text"
          placeholder="Digite um ID ou Nome"
          v-model="pesquisa"
        />
      </div>
      <div style="width: 25%; display: flex;">
        <button
          style="width: calc(100% - 4px); margin: auto 0px auto auto"
          type="button"
          @click="criarQueryPesquisar"
        >Pesquisar</button>
      </div>
    </div>
    <div id="tabela">
      <table>
        <tr>
          <th
            v-for="itemCabecalho in tableContent.cabecalho"
            :key="itemCabecalho.id"
            :style="itemCabecalho.style"
          >{{itemCabecalho.valor}}</th>
        </tr>

        <tr
          v-for="item in itensArray"
          :key="item.id"
        >
          <td style="text-align: center">{{item.id}}</td>
          <td>{{item.name}}</td>
          <td style="text-align: center">{{item.cpf}}</td>
          <td style="text-align: center">
            <router-link tag="i" :to="'/grower/'+item.id" class="material-icons successIcon fakeButton" style="margin-right: 8px">edit</router-link>
            <router-link tag="i" :to="'/properties/'+item.id" class="material-icons successIcon fakeButton">gps_fixed</router-link>
          </td>
        </tr>
        <!-- <router-link
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
        </router-link> -->
      </table>
      <Paginator
        @pagina="atualizarPagina"
        :pagina="pagina"
        :itensPagina="itensPagina"
        :totalItens="totalItens"
        v-if="totalItens != ''"
        style="margin: auto 0px auto auto"
      />
    </div>
  </div>
</template>

<script>
import connector from "@/connector.js";
// @ is an alias to /src
import Paginator from "@/components/Paginator.vue";

export default {
  name: "home",
  components: {
    Paginator
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
            { id: 2, valor: "CPF", style: "text-align: center" },
            { id: 3, valor: "Propriedades", style: "text-align: center" },
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
      pesquisaTexto: true
      // checkbox: {pesquisarInativo: false},
    };
  },
  mounted: function() {
    this.itensPagina = this.getItensPerPageByWindowSize();
    if (this.itensPagina < 4) {
      this.itensPagina = 4;
    }
    this.mountList();
    document.getElementById("focus").focus();
    document.getElementById("focus").select();
  },
  methods: {
    getItensPerPageByWindowSize: function() {
      let vH = window.innerHeight;
      let tabela = document.getElementById("tabela");
      let hOutros = 0;
      let pronto = false;
      let i = 0;
      while (pronto == false) {
        if (tabela.parentElement.children[i] == tabela) {
          pronto = true;
        } else {
          hOutros += tabela.parentElement.children[i].offsetHeight;
        }
        i++;
      }

      // mobile
      if (window.innerHeight > window.innerWidth) {
        if (window.innerWidth <= 420) {
          return Math.floor((vH - hOutros) / 40);
        }
        return Math.floor((vH - hOutros) / 40);
      } else {
        // desktop
        return Math.floor((vH - hOutros) / 40);
      }
    },
    mountList: async function() {
      // const { dispatch } = this.$store;
      // criaria a query da paginação aqui, já tem a variável página, itens por página e total de itens
      // inclusive a quantidade de itens por página eu criei uma função que pega o tamanho disponível da view e calcula a quantidade de itens que podem aparecer lá, com o mínimo de 4 itens por página
      // vide getItensPerPageByWindowSize
      const { query, pagina, itensPagina } = this;

      this.$emit("loading", true);
      this.$emit("consoleResponse", "https://my-json-server.typicode.com/pedroskakum/fake-api/grower" + this.query + "[GET]>")
      connector
        .interceptor(
          "https://my-json-server.typicode.com/pedroskakum/fake-api/grower" +
            this.query,
          null,
          "GET"
        )
        .then(e => {
          this.itensArray = e;
          this.totalItens = e.length;
          this.$emit("consoleResponse", "https://my-json-server.typicode.com/pedroskakum/fake-api/grower" + this.query + "[GET]>" + e);
          this.$emit("loading", false);
        });
    },
    atualizarPagina: function(e) {
      this.pagina = e;
    },
    searchHasChanged: function(val) {
      if (isNaN(parseInt(val))) {
        // se for texto
        console.log("TEXTO");
        this.pesquisaTexto = true;
      } else {
        // se for número
        console.log("NÚMERO");
        this.pesquisaTexto = false;
      }
    },
    criarQueryPesquisar: function() {
      let actualQuery = new URLSearchParams();
      if (this.pesquisaTexto) {
        actualQuery.append("name", this.pesquisa);
      } else {
        actualQuery.append("id", this.pesquisa);
      }
      this.query = `?${actualQuery}`;
      if (this.pesquisa == "") {
        this.query = "";
      }
      this.pagina = 1;
      this.mountList();
    }
  },
  watch: {
    pagina: function() {
      this.mountList();
    },
    pesquisa: function(val) {
      this.searchHasChanged(val);
    }
  }
};
</script>

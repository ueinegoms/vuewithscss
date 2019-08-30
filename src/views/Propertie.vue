<template>
  <div class="home contentVertical">
    <div style="display: flex; flex-direction: row; align-items: center">
      <h2
        class="corForte"
        style="display: inline-block"
        v-if="id == null"
      >Novo Proprietário {{body.name}}</h2>
      <h2
        class="corForte"
        style="display: inline-block"
        v-if="id != null"
      >Proprietário {{body.name}}</h2>
      <i
        class="material-icons successIcon fakeButton"
        style="margin-left: 16px; color: #F32541"
        v-if="id != null"
        @click="deleteMethod"
      >remove_circle</i>
    </div>
    <div class="contentHorizontal" style="margin-bottom: 8px;">
      <div style="width: 75%">
        <input
          style="width: calc(100% - 4px)"
          id="focus"
          type="text"
          placeholder="Nome"
          v-model="body.name"
        />
      </div>
      <div style="width: 25%">
        <input style="width: calc(100% - 4px)" type="text" placeholder="Cidade" v-model="body.city" />
      </div>
    </div>
    <div class="contentHorizontal">
      <div style="width: 75%">
        <!-- <input
          style="width: calc(100% - 4px)"
          id="focus"
          type="text"
          placeholder="Nome"
          v-model="body.name"
        />-->
        <select v-model="body.growerId" style="width: calc(100% - 4px)">
          <option v-for="grower in growerArray" :value="grower.id" :key="grower.id">{{grower.name}}</option>
          <!-- <option value="1">Amigavel</option> -->
        </select>
      </div>
      <div style="width: 25%">
        <input
          style="width: calc(100% - 4px)"
          type="text"
          placeholder="Área Total"
          v-model="body.total_area"
        />
      </div>
    </div>
    <div style="width: 25%; display: flex;">
      <button
        style="min-width: calc(100% - 4px); margin: 16px auto auto 0px; background: #85ff8c; color: #000"
        type="button"
        @click="create"
        v-if="id == null"
      >Criar</button>
      <button
        style="min-width: calc(100% - 4px); margin: 16px auto auto 0px; background: #85ff8c; color: #000"
        type="button"
        @click="update"
        v-if="id != null"
      >Atualizar</button>
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
            { id: 3, valor: "Propriedades", style: "text-align: center" }
          ]
          // conteúdo
          // agora refere à itensArray
        };
      }
    }
  },
  data() {
    return {
      body: {
        name: null,
        cpf: null
      },
      id: null,
      growerArray: []
      // checkbox: {pesquisarInativo: false},
    };
  },
  mounted: function() {
    this.mountGrowerSelect();
    this.getData();
    document.getElementById("focus").focus();
    document.getElementById("focus").select();
  },
  methods: {
    mountGrowerSelect: async function() {
      this.$emit(
        "consoleResponse",
        "https://my-json-server.typicode.com/pedroskakum/fake-api/grower[GET]>"
      );
      connector
        .interceptor(
          "https://my-json-server.typicode.com/pedroskakum/fake-api/grower",
          null,
          "GET"
        )
        .then(e => {
          this.growerArray = e;
          this.$emit(
            "consoleResponse",
            "https://my-json-server.typicode.com/pedroskakum/fake-api/grower[GET]>" +
              e
          );
        });
    },
    getData: async function() {
      if (this.$route.params.prop != undefined) {
        this.id = this.$route.params.prop;
      }

      if (this.id == null) {
        return;
      }

      this.$emit("loading", true);
      this.$emit(
        "consoleResponse",
        "https://my-json-server.typicode.com/pedroskakum/fake-api/properties/" +
          this.id +
          "[GET]>"
      );
      connector
        .interceptor(
          "https://my-json-server.typicode.com/pedroskakum/fake-api/properties/" +
            this.id,
          null,
          "GET"
        )
        .then(e => {
          this.body = e;
          this.$emit(
            "consoleResponse",
            "https://my-json-server.typicode.com/pedroskakum/fake-api/properties/" +
              this.id +
              "[GET]>" +
              e
          );
          this.$emit("loading", false);
        });
    },
    create: async function() {
      this.$emit("loading", true);
      this.$emit(
        "consoleResponse",
        "https://my-json-server.typicode.com/pedroskakum/fake-api/properties" +
          "[POST]>"
      );
      connector
        .interceptor(
          "https://my-json-server.typicode.com/pedroskakum/fake-api/properties",
          this.body,
          "POST"
        )
        .then(e => {
          this.body = e;
          this.$emit(
            "consoleResponse",
            "https://my-json-server.typicode.com/pedroskakum/fake-api/properties" +
              "[POST]>" +
              e
          );
          this.$emit("loading", false);

          // caso a API persistisse o create, então descomentar a próxima linha
          // this.$router.push("/");
        });
    },
    update: async function() {
      if (this.$route.params.prop != undefined) {
        this.id = this.$route.params.prop;
      }

      if (this.id == null) {
        return;
      }

      this.$emit("loading", true);
      this.$emit(
        "consoleResponse",
        "https://my-json-server.typicode.com/pedroskakum/fake-api/properties/" +
          this.id +
          "[PUT]>"
      );
      connector
        .interceptor(
          "https://my-json-server.typicode.com/pedroskakum/fake-api/properties/" +
            this.id,
          this.body,
          "PUT"
        )
        .then(e => {
          this.body = e;
          this.$emit(
            "consoleResponse",
            "https://my-json-server.typicode.com/pedroskakum/fake-api/properties/" +
              this.id +
              "[PUT]>" +
              e
          );
          this.$emit("loading", false);

          // caso a API persistisse o create, então descomentar a próxima linha
          // this.$router.push("/");
        });
    },
    deleteMethod: async function() {
      if (this.$route.params.prop != undefined) {
        this.id = this.$route.params.prop;
      }

      if (this.id == null) {
        return;
      }

      this.$emit("loading", true);
      this.$emit(
        "consoleResponse",
        "https://my-json-server.typicode.com/pedroskakum/fake-api/properties/" +
          this.id +
          "[DELETE]>"
      );
      connector
        .interceptor(
          "https://my-json-server.typicode.com/pedroskakum/fake-api/properties/" +
            this.id,
          null,
          "DELETE"
        )
        .then(e => {
          this.body = e;
          this.$emit(
            "consoleResponse",
            "https://my-json-server.typicode.com/pedroskakum/fake-api/properties/" +
              this.id +
              "[DELETE]>" +
              e
          );
          this.$emit("loading", false);

          this.$router.push("/");
        });
    }
  },
  watch: {
    $route() {
      this.$forceUpdate();
    }
  }
};
</script>

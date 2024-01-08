<template>
    <h1 class="page_title">Випуск № {{ episode.number }} {{ episode.name }}</h1>
    <button @click="get_from_favorite" class="neon-btn neon-btn--purple">Додати з обраних</button>
    <button  @click="delete_episode(episode['id'])" class="neon-btn neon-btn--purple">Видалити випуск</button>
    <div v-if="isNaN(data['notation']) == false">
        <h3 class="empty">Нотатки відсутні</h3></div>
    <div v-for="item in data['notation']" v-bind:key="item.id">

        <div class="notation">
          
            <div class="title">
                <h3><a :href="'' + item['url']" class="title">{{ item['title'] }}</a></h3>
            </div>

            <div v-if="item['short'] != 'None'" class="short">
                <p>{{ item['short'] }}</p>

            </div>
            <div class="org">Джерело: <span class="origin">{{ item['origin'] }}</span></div>
            
            <ckeditor :editor="editor" v-model="item['notation']" :config="editorConfig" :id="item['id']" />
            <button @click="get_editor_text(item['id'])" class="neon-btn neon-btn--purple save"
                :id="item['id']">Зберегти</button>

        </div>
    </div>
</template>
<script>

import axios from 'axios';

import server_ip from "@/myconfig/ipconfig.js"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'



export default {
    components: {
        ckeditor: CKEditor.component,

    },

    data() {
        return {
            data: {},
            episode: {},
            editor: ClassicEditor,
            editorConfig: {

            },
            editorData: '<p>Initial content</p>',


        }
    },

    mounted() {

        axios.get(server_ip + '/episode/get/' + this.$route.params.id).then(response => {
            this.data = response.data; this.episode = this.data['episode']
        })
    },
    methods: {

        async get_from_favorite() {
            let episode = { 'episode_id': parseInt(this.$route.params.id) }
            console.log(episode['episode_id'])
            const add_req = await axios.post(server_ip + '/episode/add_news/', episode)

            const get_notation = await axios.get(server_ip + '/episode/get/' + this.$route.params.id).then(response => {
                this.data = response.data; this.episode = this.data['episode']
            })
            console.log(add_req)
            console.log(get_notation)
        },
        get_editor_text(id) {


            // Now you can use the editorValue as needed
            //   console.log("Кількість нотаток "+this.data['notation'].length)
            let episodes = document.getElementsByClassName('ck ck-content ck-editor__editable')
            for (let ep = 0; ep < episodes.length; ep++) {
                let notation_id = this.data['notation'][ep]['id']
                let notation = episodes[ep].innerHTML
                // console.log(notation_id)
                if (id == notation_id) {
                    let update_request = {
                        "id": notation_id,
                        "notation": notation
                    }
                    axios.post(server_ip + '/episode/notation/update/', update_request)
                    // console.log('notation id ' + notation_id)
                    // console.log(episodes[ep].innerText);
                }


            }
            //   console.log(document.getElementsByClassName('ck ck-content ck-editor__editable')[0].innerText);
        },
        delete_episode(id){

            let request = { "id" : id}
            var result = window.confirm("Ви впенені, що хочете видалити всі новини зі списку обраних?");
            if (result) {
                axios.post(server_ip + '/episode/delete/', request).then(response => {
                if (response.data['status'] == '200, OK'){
                    this.$router.push({path: '/episode'})
                }

            })
            }
            
            
        }

    },


}

</script>
<style scoped>
.notation {
    background-color: ghostwhite;
    margin-left: 20%;
    margin-right: 20%;
    border-radius: 10px;
    box-shadow: 10px 5px 5px black;
    margin-top: 10px;
    margin-bottom: 20px;


}

.ckeditor {
    height: 300px;

}

.short {
    text-align: justify;
    font-size: 14px;
    color: saddlebrown;
    padding-right: 15%;
    padding-bottom: 20px;
}

.title {

    margin-top: 7px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-weight: 600;
    color: lightslategray;
    text-decoration: none;
}

.ck.ck-editor__editable {
    min-height: 200px;
    /* Set the desired minimum height */
}

.save {
    margin-top: 10px;
    margin-bottom: 10px;
}

.page_title {

    color: #5dbdff;
    text-shadow:
        0 0 5px #5dbdff,
        0 0 10px #5dbdff,
        0 0 20px #5dbdff,
        0 0 40px #8bd0ff,
        0 0 80px #8bd0ff,
        0 0 90px #8bd0ff,
        0 0 100px #8bd0ff,
        0 0 150px #8bd0ff;

}
button {
    margin-left: 10px;
    margin-right: 10px;
}
.empty{
    margin-bottom: 40px;
    color: white;
}

</style>
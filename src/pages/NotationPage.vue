<template>
    <h1 class="page_title">Випуск № {{ episode.number }} {{ episode.name }}</h1>
    <button @click="get_from_favorite" class="neon-btn neon-btn--purple">Додати з обраних</button>
    <button @click="delete_episode(episode['id'])" class="neon-btn neon-btn--purple">Видалити випуск</button>
    <div v-if="this.news_count != 0">
        <h3 class="news_count">Новин додано: {{ this.news_count }} шт. </h3>
    </div>
    <div v-if="isNaN(data['notation']) == false">
        <h3 class="empty">Нотатки відсутні</h3>
    </div>
    <div v-for="item in data['notation']" v-bind:key="item.id">

        <div class="notation">

            <div class="title">
                <h3><a :href="'' + item['url']" class="title">{{ item['title'] }}</a></h3>
            </div>
            <div class="wraper">
                <div class="preview"><a :href="item.url" :key="item.url"><img :src="item['preview']" v-bind:alt="pic"></a>
                </div>

                <div v-if="item['short'] != 'None'" class="short">
                    <p class="short">{{ item['short'] }}</p>

                </div>

            </div>

            <div class="org">Джерело: <span class="origin">{{ item['origin'] }}</span></div>
            <ckeditor :editor="editor" v-model="item['notation']" :config="editorConfig" :id="item['id']" />
            <button @click="get_editor_text(item['id'])" class="neon-btn neon-btn--purple save"
                :id="item['id']">Зберегти</button>
            <button class="neon-btn neon-btn--purple save" @click="delete_notation(item['id'])"
                :id="item['id']">Видалити</button>

        </div>
    </div>
</template>
<script>

import axios from 'axios';

import server_ip from "@/myconfig/ipconfig.js"
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';



export default {
    setup() {
        const theme = 'dark';
        const notify = (message) => {
            toast.success(message, {
                autoClose: 1000,
                theme,
            }); // ToastOptions
        }
        return { notify };
    },
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
            news_count: 0,


        }
    },

    mounted() {

        axios.get(server_ip + '/episode/get/' + this.$route.params.id).then(response => {
            this.data = response.data; this.episode = this.data['episode'];
            if (response.data['notation'] != null) {
                this.news_count = this.data['notation'].length
            }

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
            this.news_count = this.data['notation'].length
            this.notify('Додано')
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleString('uk-UA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',

            });
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
                    this.notify('Збережено')
                    // console.log('notation id ' + notation_id)
                    // console.log(episodes[ep].innerText);
                }



            }
            //   console.log(document.getElementsByClassName('ck ck-content ck-editor__editable')[0].innerText);
        },
        delete_notation(id) {
            let request = { "id": id }
            var result = window.confirm("Ви впенені, що хочете видалити новину з випуска? ");
            if (result) {
                axios.post(server_ip + '/episode/notation/delete/', request).then(response => {
                    if (response.data['status'] == '200, OK') {

                        this.data = {}
                        axios.get(server_ip + '/episode/get/' + this.$route.params.id).then(response => {
                            this.data = response.data; this.episode = this.data['episode']
                        })

                    }
                })
            }
        },
        delete_episode(id) {

            let request = { "id": id }
            var result = window.confirm("Ви впенені, що хочете видалити всі новини зі списку обраних?");
            if (result) {
                axios.post(server_ip + '/episode/delete/', request).then(response => {
                    if (response.data['status'] == '200, OK') {
                        this.$router.push({ path: '/episode' })
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
    padding-top: 15px;
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

.empty {
    margin-bottom: 40px;
    color: white;
}

.news_count {

    color: #ff5dd1;
    text-shadow:
        0 0 5px #ff5dd1,
        0 0 10px #ff5dd1,
        0 0 20px #ff5dd1,
        0 0 40px #ff19be,
        0 0 80px #ff19be,
        0 0 90px #ff19be,
        0 0 100px #ff19be,
        0 0 150px #ff19be;
}

.short {

    margin-right: 0px;
    width: 120%;
    text-align: justify;


}

.org {
    font-size: 12px;
    margin-bottom: 10px;
    color: grey;
    margin-top: 10px;
    margin-top: auto;


}

.origin {
    margin-bottom: 20px;
    color: orangered;
    font-size: 14px;
    font-weight: 600;
}

img {

    margin-right: 20px;

    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
}

.preview {

    margin: 20px;
    align-self: center;


}

.wraper {
    display: flex;
}
</style>
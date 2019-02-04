<template>
    <div>
        <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        <gallery :images="images" :index="index" @close="index = null"></gallery>
        <div class="col-sm-12 images">
            <div class="col-sm-3 image-wrapper" v-for="(image, imageIndex) in images">
                <div class="image" :key="imageIndex" @click="index = imageIndex">
                    <img :src="image" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import vue2Dropzone from 'vue2-dropzone'
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    import VueGallery from 'vue-gallery'

    export default {

        data() {

            return {

                images: [],

                dropzoneOptions: {
                    url: 'http://7b405402.ngrok.io/api/fileupload',
                    thumbnailWidth: 150,
                    maxFilesize: 0.5,
                    acceptedFiles: 'image/*',
                    addRemoveLinks: true,
                },
                index: null
            }
        },

        mounted: function mounted() {

            this.getImages();
        },

        methods: {

            getImages() {

                this.axios.get('http://7b405402.ngrok.io/api/images').then(response => {
                    if(response.data.success == true)
                    {
                        // console.log(response.data.images[0].name)
                        // this.images = response.data.images;
                        for(var i of response.data.images)
                        {
                            console.log(i.name);
                            this.images.push(i.name)
                        }
                    }
                }).catch(error => {

                });
            }
        },

        components: {
            vueDropzone: vue2Dropzone,
            gallery: VueGallery
        },


    }
</script>

<style>

    .image-wrapper img{
        width:100%;
        height:200px;
        margin-top:20px;
    }

    .images {
        margin-top:20px;
    }
</style>
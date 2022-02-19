<template>
</template>

<script>
import { required, minLength, maxLength, between  } from '@vuelidate/validators'

export default{
    name:'FormValiation',
    data(){
        return {
            username:'',
            email:'',
            password:''
        }
    },
    validations: {
        username:{
            required
        },
        email:{
            required
        },
        password:{
            required,
            minLength: minLength(3)
        }
    }
}
</script>

<style>
</style>
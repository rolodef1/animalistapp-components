<template>
	<div class="input-field">
		<input v-if="type=='text' || type=='number' || type=='time' || type=='date' || type=='password' || type=='email'" v-model="output" v-bind="input_text_bind"/>
		<textarea v-if="type=='textarea'" v-model="output" v-bind="textarea_bind"></textarea>
		<label :for="name" :class="errors_string || output ? 'active' : ''">{{label}}</label>
		<span v-if="helperText || errors_string || successText" class="helper-text" :data-error="errors_string" :data-success="successText">{{helperText}}</span>
	</div>
</template>

<script>

export default {
	props: {
		'id':{type: String,required: false},
		'name':{type: String,required: true},
		'type':{type: String,default: 'text'},
		'value':{type: [String,Boolean,Number],default: ''},
		'label':{type: String,default: ''},
		'placeholder':{type: String,default: ''},
		'classInput':{type: String,default: ''},
		'errors':{type: [Array,String],default: ''},
		'readonly':{type:Boolean,default:false},
		'helperText':{type: String,required: false,default: ''},
		'successText':{type: String,required: false,default: ''}
	},
	data: function(){
		return {
			/*Asigna como valor inicial de salida el valor inicial de entrada*/
			output: this.value
		}
	},
	computed: {
		input_text_bind: function(){
			let obj = {'type':this.type,'name':this.name,'id':this.id?this.id:this.name};
			if(this.placeholder){
				obj.placeholder = this.placeholder;
			}
			let classes = [this.classInput];
			if(this.readonly){
				obj.readonly = true;
			}else{
				classes.push('validate');
				if(this.errors_string){
					classes.push('invalid');
				}
			}
			obj.class = classes;
			return obj;
		},
		textarea_bind: function(){
			let obj = {'name':this.name,'id':this.id?this.id:this.name};
			let classes = ['materialize-textarea',this.classInput];
			if(this.readonly){
				obj.readonly = true;
			}else{
				classes.push('validate');
				if(this.errors_string){
					classes.push('invalid');
				}
			}
			obj.class = classes;
			return obj;
		},
		errors_string: function(){
			let errors_string = '';
			if(this.errors.length){
				let count_errors = this.errors.length;
				this.errors.forEach((elem,index)=>{
					errors_string += elem;
					if(count_errors-1!=index){
						errors_string +=', ';
					}
				});
			}
			return errors_string;
		}
	},
	watch: {
		/*Si se modifica el output dentro del componente entonces devuelve el valor*/
		output: function(val,oldval){
			if(val!=oldval){
				this.$emit('update:value', val);
			}
		},
		/*Si el valor de entrada cambia se vuelve a asignar output con el valor de entrada*/
		value: function(val,oldval){
			if(val!=oldval){
				this.output = val;
			}
		}
	}
}
</script>

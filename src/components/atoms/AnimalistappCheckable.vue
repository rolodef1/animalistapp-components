<template>
	<div class="input-field" :id="'input-checkable-'+id">
		<label :for="id">
			<input v-if="type=='checkbox'" type="checkbox" v-model="output" :true-value="trueValue" :false-value="falseValue" v-bind="input_checkable_bind"/>
			<input v-if="type=='radio'" type="radio" v-model="output" :value="trueValue" v-bind="input_checkable_bind"/>
			<span>{{label}}</span>
			<span :class="['helper-text',errors_string?'error':'',success_string?success_string:'']">{{errors_string?errors_string:success_string?success_string:helperText}}</span>
		</label>
	</div>
</template>

<style scope>
.helper-text.error{
	color: #F44336;
}
.helper-text.success{
	color: #26a69a;
}
</style>

<script>

export default {
	props: {
		'id':{type: String,required: true},
		'name':{type: String,required: true},
		'type':{type: String,default: 'checkbox'},
		/*Valor asignado al input*/
		'value':{type: [String,Boolean],default: false},
		/*Valor que se asigna si el input esta checked*/
		'trueValue':{type: [String,Boolean],default: true},
		/*Valor que se asigna si el input no esta checked*/
		'falseValue':{type: [String,Boolean],default: false},
		'label':{type: String,default: ''},
		'classInput':{type: String,default: ''},
		'errors':{type: [Array,String],default: ''},
		'disabled':{type:Boolean,default:false},
		'checked':{type:Boolean,default:false},
		'helperText':{type: String,required: false,default: ''}
	},
	data: function(){
		return {
			/*Asigna como valor inicial de salida el valor inicial de entrada*/
			output: this.value
		}
	},
	computed: {
		input_checkable_bind: function(){
			let obj = {'name':this.name,'id':this.id};
			let classes = [this.classInput];
			if(this.disabled){
				obj.disabled = true;
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
		},
		success_string: function(){
			return '';
		}
	},
	watch: {
		/*Si se modifica el output dentro del componente entonces devuelve el valor*/
		output: function(val,oldval){
			if(val!=oldval){
				this.$emit('update:value', val);
				this.$emit('change');
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

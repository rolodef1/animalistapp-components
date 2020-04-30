<template>
	<div class="switch">
		<label :data-error="errors_string" :class="errors_string || output ? 'active' : ''">
			{{option1}}
			<input type='checkbox' v-model="output" v-bind="switch_bind"/>
			<span class="lever"></span>
			{{option2}}
		</label>
	</div>
</template>

<script>

	export default {
		props: {
			'id':{type: String,required: false},
			'name':{type: String,required: true},
			'value':{type: [Number,Boolean],default: ''},
			'option1':{type: String,default: ''},
			'option2':{type: String,default: ''},
			'classInput':{type: String,default: ''},
			'errors':{type: [Array,String],default: ''},
			'disabled':{type:Boolean,default:false}
		},
		data: function(){
			return {
				/*Asigna como valor inicial de salida el valor inicial de entrada*/
				output: this.value
			}
		},
		computed: {
			switch_bind: function(){
				let obj = {'name':this.name,'id':this.id?this.id:this.name};
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

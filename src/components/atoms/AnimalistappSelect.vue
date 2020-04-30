<template>
	<div v-if="!readonly" class="input-field">
		<select v-if="!multiple" :name="name" :id="id?id:name" v-model="data" :class="[classSelect]">
			<option value="" :disabled="firstItemDisabled" v-if="firstItem">{{firstItem}}</option>
			<option v-for="(label, key) in list" :value="key" :selected="key==value">{{label}}</option>
		</select>
		<select v-if="multiple" :name="name" :id="id?id:name" :multiple="multiple" :class="[classSelect]">
			<option value="" :disabled="firstItemDisabled" v-if="firstItem">{{firstItem}}</option>
			<option v-for="(label, key) in list" :value="key" :selected="isSelected(key)">{{label}}</option>
		</select>
		<label :for="name">{{label}}</label>
		<span class="helper-text" :data-error="errors_string" :data-success="success_string">{{helperText}}</span>
	</div>
	<div v-else class="input-field">
		<input v-model="labelsItemsSelected" type="text" :name="name" :id="id?id:name" readonly/>
		<label :for="name" :class="{active:labelsItemsSelected}">{{label}}</label>
	</div>
</template>

<script>

export default {
	props: {
		'id':{type: String,required: false},
		'name':{type: String,required: true},
		'multiple':{type: Boolean,default: false},
		'value':{type: [Array,String,Number,Boolean],default: ''},
		'list':{type: [Array,Object],default: ()=>[]},
		'firstItem':{type: String,default: ''},
		'firstItemDisabled':{type: Boolean,default: true},
		'label':{type: String,default: ''},
		'classSelect':{type: String,default: ''},
		'errors':{type: [Array,String],default: ''},
		'readonly':{type:Boolean,default:false},
		'helperText':{type: String,required: false,default: ''}
	},
	data: function(){
		return {
			/*Asigna como valor inicial de salida el valor inicial de entrada*/
			data: this.value,
			select: null,
			select_instance: null,
			select_options: {}
		}
	},
	computed: {
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
		labelsItemsSelected: function(){
			let data = '';
			if(typeof this.data == 'object' && this.data != null){
				let count_data_items = this.data.length;
				this.data.forEach((itemData,index)=>{
					data += this.list[itemData];
					if(count_data_items-1!=index){
						data +=', ';
					}
				});
			}else{
				data =  this.data!='' ? this.list[this.data] : '';
			}
			return data;
		},
		success_string: function(){
			return '';
		}
	},
	watch: {
		/*Si se modifica el output dentro del componente entonces devuelve el valor*/
		data: function(val,oldval){
			if(val!=oldval){
				this.$emit('update:value', val);
			}
		},
		/*Si el valor de entrada cambia se vuelve a asignar output con el valor de entrada*/
		value: function(val,oldval){
			if(val!=oldval){
				this.data = val;
			}
		},
		errors_string: function(val){
			if(val==''){
				this.select_instance.wrapper.classList.remove('invalid');
			}else{
				this.select_instance.wrapper.classList.add('invalid');
			}
			this.select_options.classes = this.select_instance.wrapper.className;
			this.init();
		},
		readonly: function(val){
			if(val){
				select_instance.destroy();
			}
		}
	},
	methods:{
		/*Establece los valores resultantes de los selects al cambiar con materialize*/
		selectChange: function(elem){
			if(!this.select.getAttribute('multiple')){
				this.$set(this,'data',this.select.value);
			}else{
				this.$set(this,'data',this.select_instance.getSelectedValues());
			}
		},
		isSelected: function(elem){
			if(typeof this.data == 'object' && this.data != null){
				return this.data.some(function(item){
					return elem==item;
				});
			}else{
				return false;
			}
		},
		init: function(){
			let select_id = this.id?this.id:this.name;
			this.select = document.querySelector('#'+select_id);
			this.select_instance = M.FormSelect.init(this.select,this.select_options);
			this.select.addEventListener('change',(e) => {
				this.selectChange(this.name);
			});
		}
	},
	mounted: function(){
		if(!this.readonly){
			this.init();
		}
	},
	updated: function(){
		if(!this.readonly){
			this.init();
		}
	}
}
</script>

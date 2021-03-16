// stand alone component and child component
// 1. sends out select-change event as stand alone
// 2. acts as a child component of course-select

Vue.component('input-select',{
	props: ['options'],
	template: `
    <span> 
			<select class="form-control" @change="$emit('select-change', $event.target.value)"> 
				<option  
					v-for="(opt, index) in options" 
					:key="index"
					:value="opt.value ? opt.value : opt.subject_code" 
				> 
  				{{ opt.name ? opt.name : opt.subject}} 
				</option> 
			</select> 
		</span>`,
});
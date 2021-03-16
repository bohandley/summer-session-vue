// list of courses that are either pre loaded
// or selected from the course list
Vue.component('selected-courses', {
	props: ['selectedProgram', 'selectedCourses'],
	template: `
		<div
			:key="selectedProgram ? selectedProgram.name : ''"
			style="width:100%; margin-bottom: 10px"
		>
			<div 
				v-for="(course, idx) in maxCourses"
				class="row"
			>
					<div 
						class="col-10"
						:key="course.num + course.course.course_title"						
					>
					 {{course.num}}
					 <b>{{course.course.course_title}}</b>
					</div>
					<div 
						class="col-2"
						v-if="course.course.course_title != ''"
						@click="$emit('remove-course', course.course)"
						style="cursor:pointer;color:red;"
					>
					[X]
					</div>
			</div>
		</div>
	`,
	computed: {
		maxCourses() {
			if(this.selectedProgram){
				let maxOptions = app.getProgram().maxOptions;

				let maxCourses = Array.from({length: maxOptions}, (_, i) => i + 1);

				return maxCourses.map((c,idx)=>{
					let course = this.selectedCourses[idx] ? this.selectedCourses[idx] : {course_title:""};

					return { num: c + ". ", course: course};
				});
			}
		}
	}
});
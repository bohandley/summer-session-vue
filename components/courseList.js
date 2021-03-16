// child component of course-select
Vue.component('course-list', {
	props: ['courses', 'selectedCourses', 'subject'],
	template: `
		<div :key="subject" >
			<div v-for="course in courses" class="row">
				<div class="col center-text">
					<button 
						type="button"
						class="btn btn-primary course-select-button"
						:disabled="course.disabled ? course.disabled : false"
						@click="$emit('add-course', course)"
					>
						{{ course.course_title }}
					</button>
				</div>
			</div>
		</div>
	`,
});
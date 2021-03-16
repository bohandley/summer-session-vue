// course-select is parent component to 
// 	input-select
// 	course-list
// need to implement pagination for the course-list

Vue.component('course-select', {
	props: ['courses', 'selectedCourses', 'selected-subject', 'selected-program', 'subjects', 'program'],
	template: `
		<div>
	    <input-select
		    :options="subjects"
		    v-on:select-change="subject = $event"
		    v-if="showSubjectSelect()"
	    >
	    </input-select>

			<course-list
				:courses="filterCourses(courses)"
				:subject="subject"
				v-on:add-course="$emit('add-course', $event)"
			>
			</course-list>
		</div>
	`,
	data: ()=>{
		return {
			subject: null,
			page: 1,
			coursesPerPage: 7,
			pages: []
		}
	},
	methods: {
		showSubjectSelect(){
			// only show the subject select when the program defines it
			if(app){
				let show = app.showSubjectSelect();
				return show;
			} else {
				return false;
			}
  	},
  	noCourses() {
  		return [
  			{
  				"course_title": "No classes match this criteria!",
  				"disabled": true
  			}
  		];
  	},
  	filterCourses(courses){
  		// REFACTOR THIS!!!!!!
  		// by the program, either 
  		// paginate the courses for standard summer session
  		// or
  		// include selected courses defined in the program
  		let subject = this.subject;
  		let program = this.program;
  		let sp = this.selectedProgram;

  		let allowCourseSelect = program.defaultCourses.allowCourseSelect;

  		if(allowCourseSelect){

  			// show all courses
  			if(sp == "NONE"){
	  			// show 10 courses per page
	  			let pageCount = Math.ceil(courses.length / this.coursesPerPage);

	  			// compute the amount of pages by how many courses are available
	  			this.pages = Array.from({length: pageCount}, (_, i) => i + 1);

	  			let hasSubject = subject != null && subject != "";

	  			// filter by subject
	  			if(hasSubject){
	  				let subjectFiltCourses = courses.filter((course, idx)=>{
	  					let matchesSubject = course.subject_code == subject;

	  					return matchesSubject;
	  					let withinPageRange = idx <= this.page * this.coursesPerPage;

	  					return withinPageRange;
	  				});
	  				// filter for page range
	  				let courseList = subjectFiltCourses.filter((course, idx)=>{
	  					let withinPageRange = idx <= this.page * this.coursesPerPage;

	  					return withinPageRange;
	  				});

	  				return courseList.length != 0 ? courseList : this.noCourses();
	  			} else {
	  				// only filter for page range
	  				let courseList = courses.filter((course, idx)=>{
	  					let withinPageRange = idx <= this.page * this.coursesPerPage;

	  					return withinPageRange;
	  				});

	  				return courseList.length != 0 ? courseList : this.noCourses();
	  			}	
	  		} else {
	  			// show only the default courses
	  			let filtCourses = courses.filter((course, idx)=>{
	  				let defaultCourses = program.defaultCourses.courses;
	  				let matched = false;
	  				// check to see if the course is in the default course
	  				defaultCourses.forEach(dc=>{
	  					if(dc.subject == course.subject_code && dc.courseNum == course.course_number)
	  						matched = true;
	  				});
	  				
	  				return matched;
	  			});

	  			// certain programs may allow the course select if courses are eventually loaded in to banner
	  			if(filtCourses.length == 0) {
	  				return this.noCourses();
	  			}	else {
	  				return filtCourses;
	  			}
	  		}
  		} else {
  			// courses are empty and show no courses match this
  			return [];
  		}

  	}
	}
});
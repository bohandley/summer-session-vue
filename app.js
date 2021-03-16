// components
	// <input-select> reused select
	// <selected-courses> list for user selected courses
	// <course-select> parent component for the following:
		// <input-select>
		// <course-list>

// events
	// $emit('add-course', $event)
	// $emit('remove-course', course.course)
	// $emit('select-change', $event.target.value)

var app = new Vue({
  el: '#app',
  data () {
    return {
      courses: null,
      selectedCourses: [],
      programs: null,
      selectedProgram: null,
      selectedType: null,
      subjects: null,
      selectedSubject: null,
      applicationTypes: [
      	{
      		"name":"Select a level...",
      		"value":""
      	},
      	{
      		"name":"Undergraduate",
      		"value":"UG"
      	},
      	{
      		"name":"Graduate",
      		"value":"GR"
      	}
      ]
    }
  },
  mounted () {
  	let promises = [
  		axios.get('data/programs.json'),
  		axios.get('data/courses.json'),
  		axios.get('data/subjects.json'),
  	];
    Promise.all(promises)
      .then(response => {
     		this.programs = response[0].data.programs;
     		this.courses = response[1].data.courses;
     		this.subjects = response[2].data.subjects;
      })
  },
  methods: {
  	updateSelectedProgram(program){
  		// update the selected program
  		this.selectedProgram = program;
  		// reset the selected courses collection
  		this.selectedCourses = [];
  	},
  	removeCourse(course){
  		this.selectedCourses = this.selectedCourses.filter(c=>{
  			return c.course_title != course.course_title && c.course_number != course.course_number
  		});
  	},
  	addCourse(course){
  		// add course from the course select component
  		// DON'T FORGET ERROR HANDLING:
  			// do not allow duplicate courses
  			// allow removal of courses
  			// only allow addition of courses if less than the program's max options
  		let notDuplicated = this.selectedCourses.filter(c=>{
  			return c.course_title == course.course_title;
  		}).length == 0;

  		if (this.selectedCourses.length < this.getProgram().maxOptions && notDuplicated)
  			this.selectedCourses.push(course);
  	},
  	showImage(){
  		// display the picture if the courses are preloaded and the courses select is disabled
  		let program = this.getProgram();
  		
  		return program.defaultCourses.preloadCourses; 
  	},
  	showSubjectSelect(){
  		// only the standard summer session allows the subject select to appear
  		// which is defined in the program "NONE"
  		// by the attribute subjectSelect
  		let program = this.getProgram();

  		return program.subjectSelect;
  	},
  	getProgram() {
  		let selectedProgram = this.selectedProgram;
  		// on load selected program is null and programs are null
  		// return the dummy program until there is a selected program
  		if (selectedProgram!= null && this.programs != null){
  			let program = this.programs.find(el=> {
  				return el.value == selectedProgram;
  			});
  			return program;
  		} else {
  			return {
					"name": "",
					"value": "",
					"maxOptions": 0,
					"auditable": "",
					"defaultCourses": {
						"canRemoveCourse":false,
						"preloadCourses":true,
						"allowCourseSelect":false,
						"courses":[]
					},
					"subjectSelect": false
				}
  		}
  	}
  }
});

let vm = new Vue({
  el: "#app",
  data: {
    type: 'Title',
    toastMessages: ['hi'],
    singleToast: {
      toastBackground: '#17a2b8',
      state: 'asdas',
      toast: false,
    },
    style: {
      color: "White",
      size: 1,
      align: 'Center',
      flexAlign: 'center',
      spacing: 50,
      spaceAround: 10
    },
    newMessage: "",
    toggled: false,
    hasError: false,
    items: [
      {
        type: 'Title',
        message: "Double click to edit me",
        backup: "",
        readMode: true,
        editMode: false,
        style: {
          color: "white",
          size: '2em',
          align: 'center',
          flexAlign: 'center',
          spacing: '50px',
          spaceAround: '10px'
        }
      },
      {
        type: 'Paragraph',
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at sagittis mi, nec vehicula justo. Donec dui nibh, vestibulum at elit a, porttitor dignissim lacus. Phasellus non efficitur quam. Fusce tempor metus neque, a euismod sapien tristique ut. Vestibulum urna sapien, blandit sed dui non, volutpat mattis lacus. Vestibulum quis dictum massa. Phasellus dolor purus, imperdiet sit amet tempor et, volutpat ut felis. Aenean dictum urna ac urna tincidunt commodo.",
        backup: "",
        readMode: true,
        editMode: false,
        style: {
          color: "LightGrey",
          size: '1em',
          align:'left',
          spacing: '50px',
          spaceAround: '10px'
        }
      },
      {
        type: 'Paragraph',
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at sagittis mi, nec vehicula justo. Donec dui nibh, vestibulum at elit a, porttitor dignissim lacus. Phasellus non efficitur quam. Fusce tempor metus neque, a euismod sapien tristique ut. Vestibulum urna sapien, blandit sed dui non, volutpat mattis lacus. Vestibulum quis dictum massa. Phasellus dolor purus, imperdiet sit amet tempor et, volutpat ut felis. Aenean dictum urna ac urna tincidunt commodo.",
        backup: "",
        readMode: true,
        editMode: false,
        style: {
          color: "LightGrey",
          size: '1em',
          align:'left',
          spacing: '50px',
          spaceAround: '10px'
        }
      },
    ]
  },
  methods: {
    edit(index) {
      // console.log(document.querySelector(`.text${index}`).clientHeight);
        document.querySelector(`.textarea${index}`).style.height = `${document.querySelector(`.text${index}`).clientHeight + 10}px`;
      let $thisEl = this.items[index];
      $thisEl.backup = $thisEl.message;
      $thisEl.readMode = !$thisEl.readMode;
      $thisEl.editMode = !$thisEl.editMode;
    },
    save(index) {
      let $thisEl = this.items[index];
      $thisEl.readMode = !$thisEl.readMode;
      $thisEl.editMode = !$thisEl.editMode;
      if($thisEl.backup == $thisEl.message){
        this.singleToast.state = "Nothing was changed";
      this.singleToast.toastBackground = '#17a2b8';
      this.toastMessages.push(this.singleToast);
      }else{
        // this.singleToast.state = "Message edited with success.";
        // modified start by jxc 20180602
        // push to text-spell checking programs 
        
         /*
         axios.post('http://127.0.0.1:7880', this.newUserInfo,
         {
                headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                         }
         })
         .then(function (response) {
         console.log(response);
         })
         .catch(function (error) {
         console.log(error);
         });    
         */    
         
         axios({
          url: 'http://127.0.0.1:7880',
          method: 'post',
          data: {
            content: $thisEl.message
            // content: "机七学习是人工智能领遇最能体现智能的一个分知"
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
          }).then(function (response) {
            // console.log(response);
            // modified by jxc 20180602
             $thisEl.message=response.data;
            // modified by jxc end 20180602
          })
          .catch(function (error) {
            console.log(error);
          });
          
         
        // modified end by jxc 20180602
      this.singleToast.toastBackground = '#28a745';
      this.toastMessages.push(this.singleToast);
      }
      if (!$thisEl.message) {
        this.state = "Text deleted.";
        this.toastBackground = '#dc3545';
        $this = this;
        setTimeout(function() {
          $this.items.splice(index, 1);
        }, 1500);
      }
    },
    cancel(index){
      let $thisEl = this.items[index];
      $thisEl.message = $thisEl.backup;
      $thisEl.readMode = !$thisEl.readMode;
      $thisEl.editMode = !$thisEl.editMode;
      this.singleToast.state = "Text editing canceled";
      this.singleToast.toastBackground = '#ffc107';
      this.toastMessages.push(this.singleToast);
    },
    remove(index){
      this.items.splice(index, 1);
      this.singleToast.state = "Text deleted.";
      this.singleToast.toastBackground = '#dc3545';
      this.toastMessages.push(this.singleToast);
    },
    addText() {
      if (this.newMessage) {
        let flexAlign;
        this.style.align == 'Left' ?
          flexAlign = 'flex-start' : '';
        this.style.align == 'Right' ? 
          flexAlign = 'flex-end' : ''
        let newItem = {
          message: this.newMessage,
          type: this.type,
          backup: "",
          readMode: true,
          editMode: false,
          style: {
            color: this.style.color,
            size: this.style.size + 'em',
            align: this.style.align,
            flexAlign: flexAlign
          }
        };
        this.singleToast.state = "Message added with success";
        this.singleToast.toastBackground = '#28a745';
        this.toastMessages.push(this.singleToast);
        this.items.push(newItem);
        this.newMessage = "";
      }else{
        this.singleToast.state = "Please type something to be added.";
        this.singleToast.toastBackground = '#dc3545';
        this.toastMessages.push(this.singleToast);
      }
    },
    showMenu() {
      this.toggled = !this.toggled;
    },
    changeMarginVertical(){
      for( i = 0; i < this.items.length; i++){
        this.items[i].style.spacing = this.style.spacing + 'px';
      }
    },
    changeMarginHorizontal(){
      for( i = 0; i < this.items.length; i++){
        this.items[i].style.spaceAround = this.style.spaceAround + 'px';
      }
    }
  }
});

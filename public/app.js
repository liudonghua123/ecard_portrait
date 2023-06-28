import { ref } from 'vue'

const load_lottie = () => {
    const lottie_map = {
        // https://lottiefiles.com/146283-data-visualization
        // '#lottie1': 'https://assets8.lottiefiles.com/packages/lf20_cuKhxGQKFB.json',
        // https://lottiefiles.com/146020-network-shearing
        // '#lottie1': 'https://assets2.lottiefiles.com/packages/lf20_ryWdG6ISch.json',
        // https://lottiefiles.com/29-motorcycle
        // '#lottie1': 'https://assets8.lottiefiles.com/datafiles/jW5K6vtuzJFJSxd/data.json',
        // https://lottiefiles.com/427-happy-birthday
        '#lottie1': 'https://assets8.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json',
        // https://lottiefiles.com/147559-smartsheet-power-of-resilience
        // '#lottie2': 'https://assets9.lottiefiles.com/packages/lf20_tO7mWtYvc4.json',
        // https://lottiefiles.com/72-favourite-app-icon
        '#lottie2': 'https://assets8.lottiefiles.com/datafiles/0BklE7L1HhdHa4v/data.json',
        // https://lottiefiles.com/1370-confetti
        '#lottie3': 'https://assets4.lottiefiles.com/datafiles/U1I3rWEyksM9cCH/data.json',
    }
    for (const [key, value] of Object.entries(lottie_map)) {
        lottie.loadAnimation({
            container: document.querySelector(key),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: value
        });
    }
}

export default {

    setup() {
        const count = ref(0)
        const message = ref('Hello Vue 3!')

        const animation = (index) => {
            if (index == 0) {
                document.querySelector('#p11').classList.toggle('animate__slideInDown');
                document.querySelector('#p12').classList.toggle('animate__slideInUp');
            }
            if (index == 1) {
                document.querySelector('#p21').classList.toggle('animate__fadeInUp');
            }

            if (index == 2) {
                document.querySelector('#p31').classList.toggle('animate__zoomIn');
                document.querySelector('#p32').classList.toggle('animate__zoomInUp');
            }
        }
        const afterLoad = (origin, { index }, direction, trigger) => {
            console.log(`Emitted afterLoad event, direction: ${direction}, index: ${index}`)
            animation(index)
        }
        const onLeave = ({ index }, destination, direction, trigger) => {
            console.log(`Emitted onLeave event, direction: ${direction}, index: ${index}`)
            animation(index)
        }


        // see more options on https://github.com/alvarotrigo/fullPage.js#options
        const options = {
            licenseKey: 'gplv3-license',
            menu: '#menu',
            anchors: ['page1', 'page2', 'page3'],
            sectionsColor: ['#0798ec', '#ff5f45', '#41b883'],
            afterLoad,
            onLeave,
            css3: true,
            scrollingSpeed: 700,
            autoScrolling: true,
            scrollHorizontally: true,
            fitToSection: true,
            fitToSectionDelay: 600,
            scrollBar: false,
            easing: 'easeInOutCubic',
            easingcss3: 'ease',
        }
        let info_data = {
            STUEMPNO: 32020008155,
            NAME: '张三',
            TERMDATE: '20200904',
            TERMTIME: '112503',
            DEVICENAME: '东陆院1楼POS14',
            AMOUNT: 1.6,
            GATE_COUNT: 152.0,
            HOTEL_COUNT: null,
            SUMAMOUNT: 1186.9,
        }
        // get info from local storage, overwrite the default info_data
        const info_local_storage = localStorage.getItem('info')
        if (info_local_storage) {
            console.log(info_local_storage)
            info_data = { ...info_data, ...JSON.parse(info_local_storage) }
        }
        // get info from query string, overwrite local storage
        const params = new URLSearchParams(document.location.search.substring(1))
        const info_param = params.get("info")
        if (info_param) {
            console.log(info_param)
            info_data = { ...info_data, ...JSON.parse(info_param) }
        }
        console.log(info_data)
        let info = ref(info_data)
        return { count, message, options, info }
    },

    mounted() {
        console.log(this.count) // 0
        load_lottie()
    }

}
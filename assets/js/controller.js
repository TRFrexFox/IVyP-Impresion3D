var Init = {
    Index: function () {
        // $("body").append(Template.Sidebar()); //Error al cargar pantalla
        $("body").prepend(Template.SideNav());
        $("main").prepend(Template.NavBar());
        //Cards
        let Datos = [
            { xl: 3, sm: 6, icon: 'weekend', title: 'today Money', value: 50, footer: '50 than last week', color: 'bg-gradient-dark' },
            { xl: 3, sm: 6, icon: 'person', title: 'today Users', value: 2300, footer: '5 than lask month', color: 'bg-gradient-primary' },
            { xl: 3, sm: 6, icon: 'person', title: 'today Clients', value: 3462, footer: '5 than yesterday', color: 'bg-gradient-success' },
            { xl: 3, sm: 6, icon: 'weekend', title: 'Sales', value: 103430, footer: '4 than yesterday', color: 'bg-gradient-info' }
        ]
        console.log(Datos)
        Datos.forEach((e, i) => {
            $("#DCard").append(Template.Card(e.xl, e.sm, e.icon, e.title, e.value, e.footer, e.color));
        });

        //Graphs
        let Datos2 = [
            { lg: 4, md: 6, chid: 'chart-bars', chheight: 170, title: 'Website Views', subtitle: '50 than last week', icon: 'schedule', footer: 'test', color: 'bg-gradient-primary' },
            { lg: 4, md: 6, chid: 'chart-line', chheight: 170, title: 'Daily Sales', subtitle: '5 than lask month', icon: 'schedule', footer: 'test', color: 'bg-gradient-success' },
            { lg: 4, md: 6, chid: 'chart-line-tasks', chheight: 170, title: 'Completed Tasks', subtitle: '5 than yesterday', icon: 'schedule', footer: 'test', color: 'bg-gradient-dark' }
        ]
        console.log(Datos)
        Datos2.forEach((e, i) => {
            $("#DGraph").append(Template.Graph(e.lg, e.md, e.chid, e.chheight, e.title, e.subtitle, e.icon, e.footer, e.color));
        });

        //DTask
        $("#DTask").append(Template.Project(8, 6, 'Projects', 'fa fa-check', 30, 'this month'));
        $("#DTask").append(Template.Order());
    }
}

var Template = {
    Sidebar: () => '<aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">' +
        '<div class="sidenav-header">' +
        '<i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>' +
        '<a class="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">' +
        '<img src="./assets/img/logo-ct.png" class="navbar-brand-img h-100" alt="main_logo">' +
        '<span class="ms-1 font-weight-bold text-white">Material Dashboard 2</span>' +
        '</a>' +
        '</div>' +
        '<hr class="horizontal light mt-0 mb-2">' +
        '<div class="collapse navbar-collapse  w-auto  max-height-vh-100" id="sidenav-collapse-main">' +
        '<ul class="navbar-nav">' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white active bg-gradient-primary" href="./pages/dashboard.html">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">dashboard</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Dasboard</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white " href="./pages/tables.html">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">table_view</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Tables</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white " href="./pages/billing.html">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">receipt_long</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Billing</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white " href="./pages/virtual-reality.html">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">view_in_ar</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Virtual Reality</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white " href="./pages/rtl.html">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">format_textdirection_r_to_l</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">RTL</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white " href="./pages/notifications.html">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">notifications</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Notifications</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item mt-3">' +
        '<h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Account pages</h6>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white " href="./pages/profile.html">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">person</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Profile</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white " href="./pages/sign-in.html">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">login</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Sign In</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white " href="./pages/sign-up.html">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">assignment</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Sign Up</span>' +
        '</a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div class="sidenav-footer position-absolute w-100 bottom-0 ">' +
        '<div class="mx-3">' +
        '<a class="btn bg-gradient-primary mt-4 w-100" href="https://www.creative-tim.com/product/material-dashboard-pro?ref=sidebarfree" type="button">Upgrade to pro</a>' +
        '</div>' +
        '</div>' +
        '</aside>',
    Card: (xl = 3, sm = 6, icon, title, value, footer, color) => '<div class="col-xl-' + xl + ' col-sm-' + sm + ' mb-xl-0 mb-4">' +
        '<div class="card">' +
        '<div class="card-header p-3 pt-2">' +
        '<div class="icon icon-lg icon-shape ' + color + ' shadow-dark text-center border-radius-xl mt-n4 position-absolute">' +
        '<i class="material-icons opacity-10">' + icon + '</i>' +
        '</div>' +
        '<div class="text-end pt-1">' +
        '<p class="text-sm mb-0 text-capitalize">' + title + '</p >' +
        '<h4 class="mb-0">' + value + '</h4>' +
        '</div>' +
        '</div>' +
        '<hr class="dark horizontal my-0">' +
        '<div class="card-footer p-3">' +
        '<p class="mb-0">' + footer + '</p>' +
        '</div>' +
        '</div>' +
        '</div>',
    Graph: (lg = 4, md = 6, chid, chheight, title, subtitle, icon, footer, color) => '<div class="col-lg-' + lg + ' col-md-' + md + ' mt-4 mb-4">' +
        '<div class="card z-index-2 ">' +
        '<div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">' +
        '<div class="' + color + ' shadow-primary border-radius-lg py-3 pe-1">' +
        '<div class="chart">' +
        '<canvas id="' + chid + '" class="chart-canvas" height="' + chheight + '"></canvas>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="card-body">' +
        '<h6 class="mb-0 ">' + title + '</h6>' +
        '<p class="text-sm ">' + subtitle + '</p>' +
        '<hr class="dark horizontal">' +
        '<div class="d-flex ">' +
        '<i class="material-icons text-sm my-auto me-1">' + icon + '</i>' +
        '<p class="mb-0 text-sm"> ' + footer + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    Project: (lg = 8, md = 6, title, cicon, ivalue, itext) => '<div class="col-lg-' + lg + ' col-md-' + md + ' mb-md-0 mb-4">' +
        '<div class="card">' +
        '<div class="card-header pb-0">' +
        '<div class="row">' +
        '<div class="col-lg-6 col-7">' +
        '<h6>' + title + '</h6>' +
        '<p class="text-sm mb-0">' +
        '<i class="' + cicon + ' text-info" aria-hidden="true"></i>' +
        '<span class="font-weight-bold ms-1">' + ivalue + '</span> ' + itext +
        '</p>' +
        '</div>' +
        '<div class="col-lg-6 col-5 my-auto text-end">' +
        '<div class="dropdown float-lg-end pe-4">' +
        '<a class="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">' +
        '<i class="fa fa-ellipsis-v text-secondary"></i>' +
        '</a>' +
        '<ul class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">' +
        '<li><a class="dropdown-item border-radius-md" href="javascript:;">Action</a></li>' +
        '<li><a class="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>' +
        '<li><a class="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="card-body px-0 pb-2">' +
        '<div class="table-responsive">' +
        '<table class="table align-items-center mb-0">' +
        '<thead>' +
        '<tr>' +
        '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Companies</th>' +
        '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Members</th>' +
        '<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Budget</th>' +
        '<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Completion</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +


        '<tr>' +
        '<td>' +
        '<div class="d-flex px-2 py-1">' +
        '<div>' +
        '<img src="./assets/img/small-logos/logo-xd.svg" class="avatar avatar-sm me-3" alt="xd">' +
        '</div>' +
        '<div class="d-flex flex-column justify-content-center">' +
        '<h6 class="mb-0 text-sm">Material XD Version</h6>' +
        '</div>' +
        '</div>' +
        '</td>' +
        '<td>' +
        '<div class="avatar-group mt-2">' +
        '<a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Ryan Tompson">' +
        '<img src="./assets/img/team-1.jpg" alt="team1">' +
        '</a>' +
        '<a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Romina Hadid">' +
        '<img src="./assets/img/team-2.jpg" alt="team2">' +
        '</a>' +
        '<a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Alexander Smith">' +
        '<img src="./assets/img/team-3.jpg" alt="team3">' +
        '</a>' +
        '<a href="javascript:;" class="avatar avatar-xs rounded-circle" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Jessica Doe">' +
        '<img src="./assets/img/team-4.jpg" alt="team4">' +
        '</a>' +
        '</div>' +
        '</td>' +
        '<td class="align-middle text-center text-sm">' +
        '<span class="text-xs font-weight-bold"> $14,000 </span>' +
        '</td>' +
        '<td class="align-middle">' +
        '<div class="progress-wrapper w-75 mx-auto">' +
        '<div class="progress-info">' +
        '<div class="progress-percentage">' +
        '<span class="text-xs font-weight-bold">60%</span>' +
        '</div>' +
        '</div>' +
        '<div class="progress">' +
        '<div class="progress-bar bg-gradient-info w-60" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>' +
        '</div>' +
        '</div>' +
        '</td>' +
        '</tr>' +


        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    Order: () => '<div class="col-lg-4 col-md-6">' +
        '<div class="card h-100">' +
        '<div class="card-header pb-0">' +
        '<h6>Orders overview</h6>' +
        '<p class="text-sm">' +
        '<i class="fa fa-arrow-up text-success" aria-hidden="true"></i>' +
        '<span class="font-weight-bold">24%</span> this month' +
        '</p>' +
        '</div>' +
        '<div class="card-body p-3">' +
        '<div class="timeline timeline-one-side">' +
        '<div class="timeline-block mb-3">' +
        '<span class="timeline-step">' +
        '<i class="material-icons text-success text-gradient">notifications</i>' +
        '</span>' +
        '<div class="timeline-content">' +
        '<h6 class="text-dark text-sm font-weight-bold mb-0">$2400, Design changes</h6>' +
        '<p class="text-secondary font-weight-bold text-xs mt-1 mb-0">22 DEC 7:20 PM</p>' +
        '</div>' +
        '</div>' +
        '<div class="timeline-block mb-3">' +
        '<span class="timeline-step">' +
        '<i class="material-icons text-danger text-gradient">code</i>' +
        '</span>' +
        '<div class="timeline-content">' +
        '<h6 class="text-dark text-sm font-weight-bold mb-0">New order #1832412</h6>' +
        '<p class="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 11 PM</p>' +
        '</div>' +
        '</div>' +
        '<div class="timeline-block mb-3">' +
        '<span class="timeline-step">' +
        '<i class="material-icons text-info text-gradient">shopping_cart</i>' +
        '</span>' +
        '<div class="timeline-content">' +
        '<h6 class="text-dark text-sm font-weight-bold mb-0">Server payments for April</h6>' +
        '<p class="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 9:34 PM</p>' +
        '</div>' +
        '</div>' +
        '<div class="timeline-block mb-3">' +
        '<span class="timeline-step">' +
        '<i class="material-icons text-warning text-gradient">credit_card</i>' +
        '</span>' +
        '<div class="timeline-content">' +
        '<h6 class="text-dark text-sm font-weight-bold mb-0">New card added for order #4395133</h6>' +
        '<p class="text-secondary font-weight-bold text-xs mt-1 mb-0">20 DEC 2:20 AM</p>' +
        '</div>' +
        '</div>' +
        '<div class="timeline-block mb-3">' +
        '<span class="timeline-step">' +
        '<i class="material-icons text-primary text-gradient">key</i>' +
        '</span>' +
        '<div class="timeline-content">' +
        '<h6 class="text-dark text-sm font-weight-bold mb-0">Unlock packages for development</h6>' +
        '<p class="text-secondary font-weight-bold text-xs mt-1 mb-0">18 DEC 4:54 AM</p>' +
        '</div>' +
        '</div>' +
        '<div class="timeline-block">' +
        '<span class="timeline-step">' +
        '<i class="material-icons text-dark text-gradient">payments</i>' +
        '</span>' +
        '<div class="timeline-content">' +
        '<h6 class="text-dark text-sm font-weight-bold mb-0">New order #9583120</h6>' +
        '<p class="text-secondary font-weight-bold text-xs mt-1 mb-0">17 DEC</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    TabBar: () => {
        let html = '<div class="wrapper">' +
            '<nav class="tabs">' +
            '<div class="selector"></div>' +
            '<a tab="Cliente" onclick="Functions.ChargeList(this)" class="active"><i class="fa fa-user"></i>Cliente</a>' +
            '<a tab="Marca" onclick="SelectTab(this)"><i class="fas fa-copyright"></i>Marca</a>' +
            '<a href="#"><i class="fas fa-shoe-prints"></i>Estado</a>' +
            '<a href="#"><i class="fas fa-eye-dropper"></i>Color</a>' +
            '<a href="#"><i class="fas fa-flag-checkered"></i>Comuna</a>' +
            '<a href="#"><i class="fas fa-align-justify"></i>Region</a>' +
            '<a href="#"><i class="fas fa-dollar-sign"></i>Valor</a>' +
            '</nav>' +
            '</div>';
        return html;
    },
    SideNav: () => '<div class="fixed-plugin">' +
        '<a class="fixed-plugin-button text-dark position-fixed px-3 py-2">' +
        '<i class="material-icons py-2">settings</i>' +
        '</a>' +
        '<div class="card shadow-lg">' +
        '<div class="card-header pb-0 pt-3">' +
        '<div class="float-start">' +
        '<h5 class="mt-3 mb-0">Material UI Configurator</h5>' +
        '<p>See our dashboard options.</p>' +
        '</div>' +
        '<div class="float-end mt-4">' +
        '<button class="btn btn-link text-dark p-0 fixed-plugin-close-button">' +
        '<i class="material-icons">clear</i>' +
        '</button>' +
        '</div>' +
        '<!-- End Toggle Button -->' +
        '</div>' +
        '<hr class="horizontal dark my-1">' +
        '<div class="card-body pt-sm-3 pt-0">' +
        '<!-- Sidebar Backgrounds -->' +
        '<div>' +
        '<h6 class="mb-0">Sidebar Colors</h6>' +
        '</div>' +
        '<a href="javascript:void(0)" class="switch-trigger background-color">' +
        '<div class="badge-colors my-2 text-start">' +
        '<span class="badge filter bg-gradient-primary active" data-color="primary" onclick="sidebarColor(this)"></span>' +
        '<span class="badge filter bg-gradient-dark" data-color="dark" onclick="sidebarColor(this)"></span>' +
        '<span class="badge filter bg-gradient-info" data-color="info" onclick="sidebarColor(this)"></span>' +
        '<span class="badge filter bg-gradient-success" data-color="success" onclick="sidebarColor(this)"></span>' +
        '<span class="badge filter bg-gradient-warning" data-color="warning" onclick="sidebarColor(this)"></span>' +
        '<span class="badge filter bg-gradient-danger" data-color="danger" onclick="sidebarColor(this)"></span>' +
        '</div>' +
        '</a>' +
        '<!-- Sidenav Type -->' +
        '<div class="mt-3">' +
        '<h6 class="mb-0">Sidenav Type</h6>' +
        '<p class="text-sm">Choose between 2 different sidenav types.</p>' +
        '</div>' +
        '<div class="d-flex">' +
        '<button class="btn bg-gradient-dark px-3 mb-2 active" data-class="bg-gradient-dark" onclick="sidebarType(this)">Dark</button>' +
        '<button class="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-transparent" onclick="sidebarType(this)">Transparent</button>' +
        '<button class="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-white" onclick="sidebarType(this)">White</button>' +
        '</div>' +
        '<p class="text-sm d-xl-none d-block mt-2">You can change the sidenav type just on desktop view.</p>' +
        '<!-- Navbar Fixed -->' +
        '<div class="mt-3 d-flex">' +
        '<h6 class="mb-0">Navbar Fixed</h6>' +
        '<div class="form-check form-switch ps-0 ms-auto my-auto">' +
        '<input class="form-check-input mt-1 ms-auto" type="checkbox" id="navbarFixed" onclick="navbarFixed(this)">' +
        '</div>' +
        '</div>' +
        '<hr class="horizontal dark my-3">' +
        '<div class="mt-2 d-flex">' +
        '<h6 class="mb-0">Light / Dark</h6>' +
        '<div class="form-check form-switch ps-0 ms-auto my-auto">' +
        '<input class="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version" onclick="darkMode(this)">' +
        '</div>' +
        '</div>' +
        '<hr class="horizontal dark my-sm-4">' +
        '<a class="btn btn-outline-dark w-100" href="">View documentation</a>' +
        '<div class="w-100 text-center">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>',
    Footer: () => '<footer class="footer py-4  ">' +
        '<div class="container-fluid">' +
        '<div class="row align-items-center justify-content-lg-between">' +
        '<div class="col-lg-6 mb-lg-0 mb-4">' +
        '<div class="copyright text-center text-sm text-muted text-lg-start">' +
        '© <script>' +
        'document.write(new Date().getFullYear())' +
        '</script>,' +
        'made with <i class="fa fa-heart"></i> by' +
        '<a href="https://www.creative-tim.com" class="font-weight-bold" target="_blank">Creative Tim</a>' +
        'for a better web.' +
        '</div>' +
        '</div>' +
        '<div class="col-lg-6">' +
        '<ul class="nav nav-footer justify-content-center justify-content-lg-end">' +
        '<li class="nav-item">' +
        '<a href="https://www.creative-tim.com" class="nav-link text-muted" target="_blank">Creative Tim</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a href="https://www.creative-tim.com/presentation" class="nav-link text-muted" target="_blank">About Us</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a href="https://www.creative-tim.com/blog" class="nav-link text-muted" target="_blank">Blog</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a href="https://www.creative-tim.com/license" class="nav-link pe-0 text-muted" target="_blank">License</a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</footer>',
    NavBar: () => {
        return '<nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">' +
            '<div class="container-fluid py-1 px-3">' +
            '<nav aria-label="breadcrumb">' +
            '<ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">' +
            '<li class="breadcrumb-item text-sm"><a class="opacity-5 text-dark" href="javascript:;">Pages</a></li>' +
            '<li class="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>' +
            '</ol>' +
            '<h6 class="font-weight-bolder mb-0">Dashboard</h6>' +
            '</nav>' +
            '<div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">' +
            '<div class="ms-md-auto pe-md-3 d-flex align-items-center">' +
            '<div class="input-group input-group-outline">' +
            '<label class="form-label">Type here...</label>' +
            '<input type="text" class="form-control">' +
            '</div>' +
            '</div>' +
            '<ul class="navbar-nav  justify-content-end">' +
            '<li class="nav-item d-flex align-items-center">' +
            '<a href="javascript:;" class="nav-link text-body font-weight-bold px-0">' +
            '<i class="fa fa-user me-sm-1"></i>' +
            '<span class="d-sm-inline d-none">Sign In</span>' +
            '</a>' +
            '</li>' +
            '<li class="nav-item d-xl-none ps-3 d-flex align-items-center">' +
            '<a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">' +
            '<div class="sidenav-toggler-inner">' +
            '<i class="sidenav-toggler-line"></i>' +
            '<i class="sidenav-toggler-line"></i>' +
            '<i class="sidenav-toggler-line"></i>' +
            '</div>' +
            '</a>' +
            '</li>' +
            '<li class="nav-item px-3 d-flex align-items-center">' +
            '<a href="javascript:;" class="nav-link text-body p-0">' +
            '<i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>' +
            '</a>' +
            '</li>' +
            '<li class="nav-item dropdown pe-2 d-flex align-items-center">' +
            '<a href="javascript:;" class="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">' +
            '<i class="fa fa-bell cursor-pointer"></i>' +
            '</a>' +
            '<ul class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">' +
            '<li class="mb-2">' +
            '<a class="dropdown-item border-radius-md" href="javascript:;">' +
            '<div class="d-flex py-1">' +
            '<div class="my-auto">' +
            '<img src="./assets/img/team-2.jpg" class="avatar avatar-sm  me-3 ">' +
            '</div>' +
            '<div class="d-flex flex-column justify-content-center">' +
            '<h6 class="text-sm font-weight-normal mb-1">' +
            '<span class="font-weight-bold">New message</span> from Laur' +
            '</h6>' +
            '<p class="text-xs text-secondary mb-0">' +
            '<i class="fa fa-clock me-1"></i>' +
            '13 minutes ago' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</li>' +
            '<li class="mb-2">' +
            '<a class="dropdown-item border-radius-md" href="javascript:;">' +
            '<div class="d-flex py-1">' +
            '<div class="my-auto">' +
            '<img src="./assets/img/small-logos/logo-spotify.svg" class="avatar avatar-sm bg-gradient-dark  me-3 ">' +
            '</div>' +
            '<div class="d-flex flex-column justify-content-center">' +
            '<h6 class="text-sm font-weight-normal mb-1">' +
            '<span class="font-weight-bold">New album</span> by Travis Scott' +
            '</h6>' +
            '<p class="text-xs text-secondary mb-0">' +
            '<i class="fa fa-clock me-1"></i>' +
            '1 day' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a class="dropdown-item border-radius-md" href="javascript:;">' +
            '<div class="d-flex py-1">' +
            '<div class="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">' +
            '<svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
            '<title>credit-card</title>' +
            '<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' +
            '<g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fill-rule="nonzero">' +
            '<g transform="translate(1716.000000, 291.000000)">' +
            '<g transform="translate(453.000000, 454.000000)">' +
            '<path class="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743"></path>' +
            '<path class="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"></path>' +
            '</g>' +
            '</g>' +
            '</g>' +
            '</g>' +
            '</svg>' +
            '</div>' +
            '<div class="d-flex flex-column justify-content-center">' +
            '<h6 class="text-sm font-weight-normal mb-1">' +
            'Payment successfully completed' +
            '</h6>' +
            '<p class="text-xs text-secondary mb-0">' +
            '<i class="fa fa-clock me-1"></i>' +
            '2 days' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</a>' +
            '</li>' +
            '</ul>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</nav>';
    }
};

var Functions = {
    SelectTab: (obj) => {
        $(".tab-panel").removeClass("tab-panel-active")
        $("#" + obj.attributes.tab.value).addClass("tab-panel-active")
    },
    ChargeList: (obj) => {
        $.post("connection/model.php", { Funcion: "Color" })
            .done(function (data) {
                alert("Data Loaded: " + data);
            });
    }
}
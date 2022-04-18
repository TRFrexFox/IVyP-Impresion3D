var Init = {
    Index: () => {
        return new Promise((res, rej) => {
            if (Cookies.get('user') == undefined) {
                Functions.CerrarSession();
                rej(true)
            }
            $("body").prepend(Template.Sidebar());
            $("body").prepend(Template.SideNav());
            $("main").prepend(Template.NavBar());
            $("#Contenedor").parent().append(Template.Footer());
            res(true);
        })
    },
    Home: () => {
        Functions.MenuSelection("Dashboard", "bg-gradient-primary", 'animate__animated animate__headShake');
        Functions.Transition('main', '#Contenedor').then(() => {
            //Cards
            let datos = Functions.ChargeData('Dashboard', 'Card-Data', true);
            let Datos = [
                { xl: 3, sm: 6, icon: 'weekend', title: 'today Money', value: 50, footer: '50 than last week', color: 'bg-gradient-dark' },
                { xl: 3, sm: 6, icon: 'person', title: 'today Users', value: 2300, footer: '5 than lask month', color: 'bg-gradient-primary' },
                { xl: 3, sm: 6, icon: 'person', title: 'today Clients', value: 3462, footer: '5 than yesterday', color: 'bg-gradient-success' },
                { xl: 3, sm: 6, icon: 'weekend', title: 'Sales', value: 103430, footer: '4 than yesterday', color: 'bg-gradient-info' }
            ]
            $("#Contenedor").append('<div id="DCard" class="row"></div><div id="DGraph" class="row mt-4"></div><div id="DTask" class="row mb-4"></div>')
            Datos.forEach((e, i) => {
                $("#DCard").append(Template.Card(e.xl, e.sm, e.icon, e.title, e.value, e.footer, e.color));
            });

            //Graphs
            let Datos2 = [
                { lg: 4, md: 6, chid: 'chart-bars', chheight: 170, title: 'Website Views', subtitle: '50 than last week', icon: 'schedule', footer: 'test', color: 'bg-gradient-primary' },
                { lg: 4, md: 6, chid: 'chart-line', chheight: 170, title: 'Daily Sales', subtitle: '5 than lask month', icon: 'schedule', footer: 'test', color: 'bg-gradient-success' },
                { lg: 4, md: 6, chid: 'chart-line-tasks', chheight: 170, title: 'Completed Tasks', subtitle: '5 than yesterday', icon: 'schedule', footer: 'test', color: 'bg-gradient-dark' }
            ]
            Datos2.forEach((e, i) => {
                $("#DGraph").append(Template.Graph(e.lg, e.md, e.chid, e.chheight, e.title, e.subtitle, e.icon, e.footer, e.color));
            });

            //DTask
            $("#DTask").append(Template.Project(8, 6, 'Projects', 'fa fa-check', 30, 'this month'));
            $("#DTask").append(Template.Order());

            Functions.Graphics();
        })
    },
    Mantenedor: () => {
        Functions.MenuSelection("Mantenedor", "bg-gradient-primary", 'animate__animated animate__headShake');
        Functions.Transition('main', '#Contenedor').then(() => {
            let tabs = [
                { tab: 'Cliente', icon: 'fa fa-user' },
                { tab: 'Marca', icon: 'fas fa-copyright' },
                { tab: 'Estado', icon: 'fas fa-hourglass-half' },
                { tab: 'Color', icon: 'fas fa-eye-dropper' },
                { tab: 'Comuna', icon: 'fas fa-flag-checkered' },
                { tab: 'Region', icon: 'fas fa-align-justify' },
                { tab: 'Pla', icon: 'fas fa-wave-square' },
                { tab: 'Categoria', icon: 'far fa-list-alt' },
                { tab: 'Valorizacion', icon: 'fas fa-dollar-sign' },
                { tab: 'Papeleria', icon: 'fas fa-scroll' },
                { tab: 'Formato_Papel', icon: 'fas fa-ruler-combined' },
                { tab: 'Textura', icon: 'fas fa-hand-sparkles' },
                { tab: 'Medicion', icon: 'fas fa-ruler' },
                { tab: 'Tienda', icon: 'fas fa-store' },
                { tab: 'Impresora', icon: 'fas fa-print' },
            ];
            $("#Contenedor").eq(0).prepend(Template.TabBar(tabs))

            $(".tabs a").click((obj) => {
                $("#Contenedor .row").empty();
                let atr = obj.currentTarget.attributes.tab.value;
                $("#Contenedor").append(Template.CardTable(atr, true, 12, true, atr, false, { fn: 'Formulario.' + atr + '()' }));

                let datos = Functions.ChargeData(atr, 'Read', true);
                $("#" + atr + " .card-body").append(Template.Table(atr, datos,
                    false,
                    { fn: 'Formulario.' + atr + '(this.attributes.rowid.value, true)' },
                    { fn: 'Template.SADecision(\'question\',\'¿Elimnar registro?\', \'Se eliminar el registro \'+ this.attributes.rowid.value).then((d)=>{if(d)Functions.setData(\'' + atr + '\', \'Delete\', this.attributes.rowid.value).then(()=>{$(\'[tab=' + atr + ']\').click()})})' }
                ));
                $("table").DataTable();
            })

            $("a[tab]:eq(0)").click()
            $("table").DataTable();

            Functions.TabsInit();
            Functions.TooltipInit();
        })
    },
    Formulario: () => {
        Functions.MenuSelection("Solicitud3D", "bg-gradient-primary", 'animate__animated animate__headShake');
        Functions.Transition('main', '#Contenedor').then(() => {
            Persistant.Incremental = 0;
            $("#Contenedor")
                .append(Template.CardTable('Detalle', false, 3, true, 'Detalle', false, false, false))
                .append(Template.CardTable('Solicitud', false, 9, true, 'Solicitud', false, { fn: "Functions.addParte()" }, true));
            $("#Solicitud .card-body").append(Formulario.Solicitud());
            $("#Solicitud").append(Template.CardTable('Parte', false, 12, true, 'Parte', false, false, true, 'margin-top:50px'));
            $("#Parte > .card > .card-body").append(Formulario.Parte());

            $("#Detalle").append(Template.CardTable('Clientes', false, 12, true, 'Clientes', false, false, false, 'margin-top:50px'));
            $("#Detalle > .card > .card-body").append(Template.Detalle([
                { nombre: 'Horas', hr: false, iconn: '<i class="far fa-clock"></i>' },
                { nombre: 'KW', hr: false, iconn: '<i class="fas fa-bolt"></i>' },
                { nombre: 'Costo', hr: true, iconn: '<i class="fas fa-dollar-sign"></i>' },
                { nombre: 'Subtotal', hr: false },
                { nombre: 'Descuento', hr: false },
                { nombre: 'Total a Pagar', hr: true },
                { nombre: 'Ganancia', hr: true },
            ], true));
            $("#Clientes > .card > .card-body").append(Template.ListClientes('Cliente', Functions.ChargeData("Cliente", "Read", false)));
            Functions.ChargeData("Valorizacion", "Read", true);

            Functions.TooltipInit();
        })
    },
    Impresiones: () => {
        Functions.MenuSelection("Impresiones", "bg-gradient-primary", 'animate__animated animate__headShake');
        Functions.Transition('main', '#Contenedor').then(() => {
            $("#Contenedor").append(Template.CardTable('ListImpresiones', true, 12, true, 'Impresiones', false, false));
            $("#ListImpresiones .card-body").append(Template.Table("ListImpresiones", Functions.ChargeData('Impresion', 'Listar-Impresiones', true),
                // { fn: "$(\'main > .container-fluid\').prepend(Template.Etiqueta());$('#etiqueta-content').empty().append(Template.Imp3DDetalle(this.attributes.rowid.value,'Impresion'));const ps = new PerfectScrollbar('#etiqueta', {wheelSpeed: 2,wheelPropagation: true,minScrollbarLength: 20});$('#etiqueta').removeClass('animate__animated animate__fadeOutBottomRight')" },
                { fn: "$(\'.modal-body\').empty().append(Template.Imp3DDetalle(this.attributes.rowid.value,'Impresion'));$(\'.modal-footer\').empty();$(\'.modal-title\').empty().append(\'Detalle de Impresion\');$(\'#modal\').modal(\'show\')" },
                { fn: 'Formulario.Impresion(this.attributes.rowid.value, true)' },
                false,
                [],
                []
            ));
            $("body").append(Template.Modal([{}]))
            $("table").DataTable({
                orderFixed: [7, 'asc'],
                rowGroup: {
                    dataSrc: 7
                },
                columnDefs: [{ targets: [], visible: false }],
                responsive: true
            });
        })
    },
    Pendientes: () => {
        Functions.MenuSelection("Pendientes", "bg-gradient-primary", 'animate__animated animate__headShake');
        Functions.Transition('main', '#Contenedor').then(() => {
            $("#Contenedor").append(Template.CardTable('ListImpresiones', true, 12, true, 'Impresion - Partes', false, false));
            $("#ListImpresiones .card-body").append(Template.Table("ListImpresiones", Functions.ChargeData('Impresion', 'Listar-Partes-Pendientes', true),
                // { fn: "$(\'main > .container-fluid\').prepend(Template.Etiqueta());$('#etiqueta-content').empty().append(Template.Imp3DDetalle(this.attributes.rowid.value,'Impresion'));const ps = new PerfectScrollbar('#etiqueta', {wheelSpeed: 2,wheelPropagation: true,minScrollbarLength: 20});$('#etiqueta').removeClass('animate__animated animate__fadeOutBottomRight')" },
                { fn: "$(\'.modal-body\').empty().append(Template.Imp3DDetalle(this.attributes.rowid.value,'Impresion'));$(\'.modal-footer\').empty();$(\'.modal-title\').empty().append(\'Detalle de Impresion\');$(\'#modal\').modal(\'show\')" },
                { fn: 'Formulario.Impresion(this.attributes.rowid.value, true)' },
                false,
                [1, 2, 3, 4, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22, 23]
            ));
            $("body").append(Template.Modal([{}]))
            $("table").DataTable();
        })
    },
    FormularioPapel: () => {
        Functions.MenuSelection("SolicitudPapel", "bg-gradient-primary", 'animate__animated animate__headShake');
        Functions.Transition('main', '#Contenedor').then(() => {
            Persistant.Incremental = 0;
            $("#Contenedor")
                .append(Template.CardTable('Detalle', false, 3, true, 'Detalle', false, false))
                .append(Template.CardTable('Solicitud', false, 9, true, 'Solicitud', false, { fn: "Functions.addParte()" }));
            $("#Solicitud .card-body").append(Formulario.Solicitud());
            $("#Solicitud").append(Template.CardTable('Parte', false, 12, true, 'Parte', false, false, false, 'margin-top:50px'));
            $("#Parte > .card > .card-body").append(Formulario.Parte());

            $("#Detalle").append(Template.CardTable('Clientes', false, 12, true, 'Clientes', false, false, false, 'margin-top:50px'));
            $("#Detalle > .card > .card-body").append(Template.Detalle([
                { nombre: 'Horas', hr: false, iconn: '<i class="far fa-clock"></i>' },
                { nombre: 'KW', hr: false, iconn: '<i class="fas fa-bolt"></i>' },
                { nombre: 'Costo', hr: true, iconn: '<i class="fas fa-dollar-sign"></i>' },
                { nombre: 'Subtotal', hr: false },
                { nombre: 'Descuento', hr: false },
                { nombre: 'Total a Pagar', hr: true },
                { nombre: 'Ganancia', hr: true },
            ], true));
            $("#Clientes > .card > .card-body").append(Template.ListClientes('Cliente', Functions.ChargeData("Cliente", "Read", false)));
            Functions.ChargeData("Valorizacion", "Read", true);

            Functions.TooltipInit();
        })
    },
    Perfil: () => {
        Functions.MenuSelection("Perfil", "bg-gradient-primary", 'animate__animated animate__headShake');
        Functions.Transition('main', '#Contenedor').then(() => {
            $("#Contenedor")
                .append(Template.CardMask())
                .append(Template.BigCard())
        })
    }
}

var Persistant = {};

var Template = {
    Sidebar: () => '<aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">' +
        '<div class="sidenav-header">' +
        '<i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>' +
        '<a class="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">' +
        '<img src="./assets/img/Logo.png" class="navbar-brand-img h-100" alt="main_logo">' +
        '<span class="ms-3 font-weight-bold text-white">Impresiona tu Mundo</span>' +
        '</a>' +
        '</div>' +
        '<hr class="horizontal light mt-0 mb-2">' +
        '<div class="collapse navbar-collapse  w-auto  max-height-vh-100" id="sidenav-collapse-main">' +
        '<ul class="navbar-nav">' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white" onclick="Init.Home()" page="Dashboard">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">dashboard</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Dashboard</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item mt-3">' +
        '<h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Impresion 3D</h6>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white" onclick="Init.Impresiones()" page="Impresiones">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">assignment</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Impresiones</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white" onclick="Init.Pendientes()" page="Pendientes">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">assignment_late</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Pendientes</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white" onclick="Init.Formulario()" page="Solicitud3D">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">content_paste</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Solicitud</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item mt-3">' +
        '<h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Impresion Papel</h6>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white" onclick="Init.FormularioPapel()" page="SolicitudPapel">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">import_contacts</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Solicitud</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item mt-3">' +
        '<h6 class="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Administracion</h6>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white" onclick="Init.Mantenedor()" page="Mantenedor">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">settings</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Mantenedor</span>' +
        '</a>' +
        '</li>' +
        '<li class="nav-item">' +
        '<a class="nav-link text-white" onclick="Init.Perfil()" page="Perfil">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">person</i>' +
        '</div>' +
        '<span class="nav-link-text ms-1">Perfil</span>' +
        '</a>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div class="sidenav-footer position-absolute w-100 bottom-0 ">' +
        '<div class="mx-3">' +
        '<button class="btn bg-gradient-primary mt-4 w-100" onclick="Functions.CerrarSession()">' +
        '<div class="text-white text-center me-2 d-flex align-items-center justify-content-center">' +
        '<i class="material-icons opacity-10">power_settings_new</i>' +
        '<span class="nav-link-text ms-1">Salir</span>' +
        '</div>' +
        '</button>' +
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
    TabBar: (tabs) => {
        let active = true;
        let html = '<div class="wrapper contenedor-tabbar">' +
            '<nav class="tabs">' +
            '<div class="selector"></div>';
        tabs.forEach(e => {
            html += '<a tab="' + e.tab + '" class="' + ((active) ? 'active' : '') + '"  data-bs-toggle="tooltip" data-bs-placement="top" title="' + e.tab.replace("_", " ") + '"><i class="' + e.icon + '"></i></a>';
            active = false;
        });
        html += '</nav>' +
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
        '<h5 class="mt-3 mb-0">Visualizacion</h5>' +
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
        '© ' +
        new Date().getFullYear() +
        ', Informatica VyP Servicios' +
        '</div>' +
        '</div>' +
        '<!-- <div class="col-lg-6">' +
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
        '</div> -->' +
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
            '</div>' +
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
    },
    CardTable: (id, row, col, header, headerTitle, footer, addBtn, collapse = false, customStyle = '') => {
        let html = (row) ? '<div class="row">' : '';
        html += '<div id="' + id + '" class="col-' + col + '" style="' + customStyle + '">' +
            '<div class="card my-4">';
        html += (header) ? '<div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">' +
            '<div class="bg-gradient-primary shadow-primary border-radius-lg custom-pad-title-car">' +
            '<h6 class="text-white text-capitalize ps-3 dib">' + headerTitle.replace("_", " ") + '</h6>' : '';
        html += (collapse) ? '<button class="btn btn-info btn-Card-Title" onclick="$(\'#' + id + ' > .card > .card-body\').slideToggle()"><i class="fas fa-chevron-up"></i></button>' : '';
        html += (addBtn != false) ? '<button class="btn btn-success btn-Card-Title" onclick="' + addBtn.fn + '"><i class="fa fa-plus"></i></button>' : '';
        html += (header) ? '</div></div>' : '';
        html += '<div class="card-body px-3 pb-2">' +
            '</div>';
        html += (footer) ? '<div class="card-footer p-3"></div>' : '';
        html += '</div>' +
            '</div>';
        html += (row) ? '</div>' : '';
        return html;
    },
    Table: (id, data, view, edit, del, remCols = [], respCols = []) => {
        let th = true;
        let html = '<div class="table-responsive p-0" style="padding: 0px 5px 5px 5px !important;">' +
            '<table id="' + id + '" class="table hover stripe align-items-center mb-0 responsive nowrap">';
        data.forEach((e, k) => {
            if (th) {
                html += '<thead>' +
                    '<tr>';
                (Object.keys(e)).forEach((key, idx) => {
                    if (!remCols.some(x => x == idx))
                        html += '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center ' + (respCols.some(x => x == idx) ? 'none' : '') + '">' + key.replace("_", " ") + '</th>';
                });
                html += (view || edit || del) ? '<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-center">Acciones</th>' : '';
                html += '</tr>' +
                    '</thead>';
                html += '<tbody>';
            }
            th = false;
            html += '<tr>';
            (Object.keys(e)).forEach((key, idx) => {
                if (!remCols.some(x => x == idx))
                    html += '<td class="align-middle text-center">' + e[key] + '</th>';
            });
            html += (view || edit || del) ? '<td class="align-middle text-center">' : '';
            html += (view) ? '<button class="btn btn-info btn-accion" rowid="' + e['id'] + '" onclick="' + view.fn + '"><i class="fas fa-eye"></i></button>' : '';
            html += (edit) ? '<button class="btn btn-success btn-accion" rowid="' + e['id'] + '" onclick="' + edit.fn + '"><i class="fas fa-edit"></i></button>' : '';
            html += (del) ? '<button class="btn btn-danger btn-accion" rowid="' + e['id'] + '" onclick="' + del.fn + '"><i class="fas fa-trash"></i></button>' : '';
            html += (view || edit || del) ? '</td>' : '';
            html += '</tr>';
        });
        html += '</tbody>' +
            '</table>' +
            '</div>';
        return html;
    },
    Modal: (btn) => {
        let html = '<div class="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h5 class="modal-title"></h5>' +
            '<button type="button" class="btn-close" style="background-color: red" data-bs-dismiss="modal" aria-label="Close" ></button>' +
            '</div>' +
            '<div class="modal-body"></div>' +
            '<div class="modal-footer">';
        btn.forEach(e => {
            html += '<button class="' + e.class + '" onclick="' + e.fn + '">' + e.text + '</button>';
        });
        html += '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return html;
    },
    Formulario: (id, ref, form) => {
        let html = '<form id="' + id + '" ref="' + ref + '">' +
            '<div class="row">';
        form.forEach(Val => {
            html += '<div class="col-' + Val.col + '">' +
                '<label>' + Val.label + '</label>';
            if (Val.type == "text") {
                html += '<input type="text" id="' + Val.ref + '" name="' + Val.ref + '" class="form-control custom-input ' + Val.class + '" ' + Val.fn + ' value="' + ((Val.def != undefined) ? Val.def : "") + '" ' + Val.disabled + ' ' + Val.required + '/>';
            } else if (Val.type == "select") {
                let data = Functions.ChargeData(Val.ref, 'Read');
                html += Template.Select(Val.ref, data, Val.fn, Val.def);
            } else if (Val.type == "password") {
                html += '<input type="password" id="' + Val.ref + '" name="' + Val.ref + '" class="form-control custom-input ' + Val.class + '" ' + Val.fn + ' value="' + ((Val.def != undefined) ? Val.def : "") + '" ' + Val.disabled + ' ' + Val.required + '/>';
            } else if (Val.type == "date") {
                html += '<input type="date" id="' + Val.ref + '" name="' + Val.ref + '" class="form-control custom-input ' + Val.class + '" ' + Val.fn + ' value="' + ((Val.def != undefined) ? Val.def : "") + '" ' + Val.disabled + ' ' + Val.required + '/>';
            } else if (Val.type == "email") {
                html += '<input type="email" id="' + Val.ref + '" name="' + Val.ref + '" class="form-control custom-input ' + Val.class + '" ' + Val.fn + ' value="' + ((Val.def != undefined) ? Val.def : "") + '" ' + Val.disabled + ' ' + Val.required + '/>';
            } else if (Val.type == "file") {
                html += '<input type="file" id="' + Val.ref + '" name="' + Val.ref + '" class="form-control custom-input ' + Val.class + '" ' + Val.fn + ' value="' + ((Val.def != undefined) ? Val.def : "") + '" ' + Val.disabled + ' ' + Val.required + '/>';
            } else if (Val.type == "number") {
                html += '<input type="number" id="' + Val.ref + '" name="' + Val.ref + '" class="form-control custom-input ' + Val.class + '" ' + Val.fn + ' value="' + ((Val.def != undefined) ? Val.def : "") + '" ' + Val.disabled + ' ' + Val.required + '/>';
            } else if (Val.type == "radio") {
                html += '<input type="radio" id="' + Val.ref + '" name="' + Val.ref + '" class="form-control custom-input ' + Val.class + '" ' + Val.fn + ' value="' + ((Val.def != undefined) ? Val.def : "") + '" ' + Val.disabled + ' ' + Val.required + '/>';
            } else if (Val.type == "checkbox") {
                html += '<input type="checkbox" id="' + Val.ref + '" name="' + Val.ref + '" class="form-control custom-input ' + Val.class + '" ' + Val.fn + ' value="' + ((Val.def != undefined) ? Val.def : "") + '" ' + Val.disabled + ' ' + Val.required + '/>';
            }
            html += '</div>';
        });
        html += '</div>' +
            '</form>';
        return html;
    },
    Select: (id, data, fn, def) => {
        let attr;
        let html = '<select id="' + id + '" name="' + id + '" class="form-control custom-input" ' + fn + ' style="width: 100% !important;">';
        html += '<option value="-1" ' + ((def == undefined) ? 'selected' : '') + ' readonly>Seleccione</option>';
        data.forEach(e => {
            attr = "";
            (Object.keys(e)).forEach(key => {
                attr += key + '="' + e[key] + '"';
            });
            html += '<option ' + ((def == e.nombre) ? 'selected' : '') + ' value="' + e.id + '" ' + attr + '>' + e.nombre + '</option>';
        });
        html += '</select>';
        return html;
    },
    Toast: (icon, title, time = 3000, position = 'top-end', progressbar = true) => {
        const Toast = Swal.mixin({
            toast: true,
            position: position,
            showConfirmButton: false,
            timer: time,
            timerProgressBar: progressbar,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: icon,
            title: title
        })
    },
    ListClientes: (name, Data) => {
        let html = "";
        Data.forEach(e => {
            html += '<div class="row">' +
                '<div class="col-8" data-bs-toggle="tooltip" data-bs-placement="top" title="' + e.rut + ' - ' + e.region + ' - ' + e.comuna + '">' +
                e.nombre + ' ' + e.apellido_paterno + ' ' + e.apellido_materno +
                '</div>' +
                // '<div class="col-4" data-bs-toggle="tooltip" data-bs-placement="top" title="' + e.region + '">' +
                // e.comuna +
                // '</div>' +
                '<div class="col-4">' +
                '<div class="pretty p-switch p-fill">' +
                '<input type="radio" name="' + name + '" value="' + e.id + '" />' +
                '<div class="state p-success">' +
                '<label></label>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<hr>';
        });
        return html;
    },
    Detalle: (Data, btn = false) => {
        let html = "";
        Data.forEach(e => {
            html += (e.icon == undefined) ? '<div class="row">' +
                '<div class="col-6" style="text-align:center">' +
                e.nombre +
                '</div>' +
                '<div class="col-6" style="text-align:center;" id="' + e.nombre + '">' +
                ((e.value == undefined) ? '0' : e.value) +
                '</div>' +
                '</div>' :
                // TODO: Hacer listado vertical con iconos 
                '<div class="row">' +
                '<div class="col-4" style="text-align:center">' +
                e.icon +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-4" style="text-align:center" id="' + e.nombre + '">' +
                e.nombre +
                '</div>' +
                '</div>';
            html += (e.hr) ? '<hr>' : '';
        });
        html += (btn) ? '<div class="row">' +
            '<div class="col-12" style="text-align:center;">' +
            '<button class="btn btn-success" onclick="Functions.PrepararSolicitud3D()">Preparar</button>' +
            '</div>' +
            '</div>' : '';
        return html;
    },
    Imp3DDetalle: (id, list, etiqueta = false) => {
        let D = Persistant[list].find(x => x.id == id);
        let Cord = $('[rowid=' + id + ']').offset();
        (etiqueta) ? $('#etiqueta').css({ top: Cord.top + 14, left: Cord.left - 399, display: 'initial' }).addClass('pendulo') : '';
        let html = '<div class="row">' +
            '<div class="col-6">' +
            '<label class="form-label">Cliente</label>' +
            '<input type="text" class="form-control custom-input " value="' + (D.nombre + ' ' + D.apellido_paterno + ' ' + D.apellido_materno) + '" />' +
            '</div>' +
            '<div class="col-6">' +
            '<label class="form-label">Correo</label>' +
            '<input type="text" class="form-control custom-input " value="' + D.correo + '" />' +
            '</div>' +
            '<div class="col-6">' +
            '<label class="form-label">Telefono</label>' +
            '<input type="text" class="form-control custom-input " value="' + D.telefono + '" />' +
            '</div>' +
            '<div class="col-6">' +
            '<label class="form-label">Comuna/Region</label>' +
            '<input type="text" class="form-control custom-input " value="' + D.comuna + '/' + D.region + '" />' +
            '</div>' +
            '<div class="col-6">' +
            '<label class="form-label">Codigo Postal</label>' +
            '<input type="text" class="form-control custom-input " value="' + D.codigo_postal + '" />' +
            '</div>' +
            '<div class="col-6">' +
            '<label class="form-label">Costo</label>' +
            '<input type="text" class="form-control custom-input " value="' + D.costo + '" />' +
            '</div>' +
            '<div class="col-6">' +
            '<label class="form-label">Descuento</label>' +
            '<input type="text" class="form-control custom-input " value="' + D.descuento + '" />' +
            '</div>' +
            '<div class="col-6">' +
            '<label class="form-label">Subtotal</label>' +
            '<input type="text" class="form-control custom-input " value="' + D.subtotal + '" />' +
            '</div>' +
            '<div class="col-6">' +
            '<label class="form-label">Total</label>' +
            '<input type="text" class="form-control custom-input " value="' + D.total + '" />' +
            '</div>' +
            '</div>';
        return html;
    },
    SADecision: (icon, title, text, time = 5000, position = 'top-end', progressbar = true) => {
        return new Promise((res, rej) => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success ',
                    cancelButton: 'btn btn-danger mg-right-5'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                toast: true,
                position: position,
                timer: time,
                timerProgressBar: progressbar,
                title: title,
                text: text,
                icon: icon,
                showCancelButton: true,
                confirmButtonText: '<i class="fas fa-check"></i>',
                cancelButtonText: '<i class="fas fa-ban"></i>',
                reverseButtons: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    res(true);
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    Template.Toast('info', 'Se cancelo la solicitud', 1500);
                    res(false);
                }
            })
        })
    },
    CardMask: () => {
        let html = '<div class="page-header min-height-300 border-radius-xl" style="background-image: url(\'https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80\');">' +
            '<span class="mask  bg-gradient-primary opacity-6"></span>' +
            '</div>';
        return html;
    },
    BigCard: (user) => {
        let html = '<div class="card card-body mx-3 mx-md-4 mt-n6">' +
            '<div class="row gx-4 mb-2">' +
            '<div class="col-auto">' +
            '<div class="avatar avatar-xl position-relative">' +
            '<img src="assets/img/bruce-mars.jpg" alt="profile_image" class="w-100 border-radius-lg shadow-sm">' +
            '</div>' +
            '</div>' +
            '<div class="col-auto my-auto">' +
            '<div class="h-100">' +
            '<h5 class="mb-1">' +
            'Richard Davis' +
            '</h5>' +
            '<p class="mb-0 font-weight-normal text-sm">' +
            'CEO / Co-Founder' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="row">' +
            '</div>' +
            '</div>';
        return html;
    },
    CardPlatformSetting: () => {
        let html = '<div class="col-12 col-xl-4">' +
            '<div class="card card-plain h-100">' +
            '<div class="card-header pb-0 p-3">' +
            '<h6 class="mb-0">Platform Settings</h6>' +
            '</div>' +
            '<div class="card-body p-3">' +
            '<h6 class="text-uppercase text-body text-xs font-weight-bolder">Account</h6>' +
            '<ul class="list-group">' +
            '<li class="list-group-item border-0 px-0">' +
            '<div class="form-check form-switch ps-0">' +
            '<input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault" checked>' +
            '<label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault">Email me when someone follows me</label>' +
            '</div>' +
            '</li>' +
            '<li class="list-group-item border-0 px-0">' +
            '<div class="form-check form-switch ps-0">' +
            '<input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault1">' +
            '<label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault1">Email me when someone answers on my post</label>' +
            '</div>' +
            '</li>' +
            '<li class="list-group-item border-0 px-0">' +
            '<div class="form-check form-switch ps-0">' +
            '<input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault2" checked>' +
            '<label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault2">Email me when someone mentions me</label>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '<h6 class="text-uppercase text-body text-xs font-weight-bolder mt-4">Application</h6>' +
            '<ul class="list-group">' +
            '<li class="list-group-item border-0 px-0">' +
            '<div class="form-check form-switch ps-0">' +
            '<input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault3">' +
            '<label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault3">New launches and projects</label>' +
            '</div>' +
            '</li>' +
            '<li class="list-group-item border-0 px-0">' +
            '<div class="form-check form-switch ps-0">' +
            '<input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault4" checked>' +
            '<label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault4">Monthly product updates</label>' +
            '</div>' +
            '</li>' +
            '<li class="list-group-item border-0 px-0 pb-0">' +
            '<div class="form-check form-switch ps-0">' +
            '<input class="form-check-input ms-auto" type="checkbox" id="flexSwitchCheckDefault5">' +
            '<label class="form-check-label text-body ms-3 text-truncate w-80 mb-0" for="flexSwitchCheckDefault5">Subscribe to newsletter</label>' +
            '</div>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>';
        return html;
    },
    CardProfileInfo: () => {
        let html = '<div class="col-12 col-xl-4">' +
            '<div class="card card-plain h-100">' +
            '<div class="card-header pb-0 p-3">' +
            '<div class="row">' +
            '<div class="col-md-8 d-flex align-items-center">' +
            '<h6 class="mb-0">Profile Information</h6>' +
            '</div>' +
            '<div class="col-md-4 text-end">' +
            '<a href="javascript:;">' +
            '<i class="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile"></i>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="card-body p-3">' +
            '<p class="text-sm">' +
            'Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no.pain avoidance is creating an illusion of equality).' +
            '</p>' +
            '<hr class="horizontal gray-light my-4">' +
            '<ul class="list-group">' +
            '<li class="list-group-item border-0 ps-0 pt-0 text-sm"><strong class="text-dark">Full Name:</strong> &nbsp; Alec M. Thompson</li>' +
            '<li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Mobile:</strong> &nbsp; (44) 123 1234 123</li>' +
            '<li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong> &nbsp; alecthompson@mail.com</li>' +
            '<li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Location:</strong> &nbsp; USA</li>' +
            '<li class="list-group-item border-0 ps-0 pb-0">' +
            '<strong class="text-dark text-sm">Social:</strong> &nbsp;' +
            '<a class="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">' +
            '<i class="fab fa-facebook fa-lg"></i>' +
            '</a>' +
            '<a class="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">' +
            '<i class="fab fa-twitter fa-lg"></i>' +
            '</a>' +
            '<a class="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0" href="javascript:;">' +
            '<i class="fab fa-instagram fa-lg"></i>' +
            '</a>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>';
        return html;
    },
    CardConversation: () => {
        let html = '<div class="col-12 col-xl-4">' +
            '<div class="card card-plain h-100">' +
            '<div class="card-header pb-0 p-3">' +
            '<h6 class="mb-0">Conversations</h6>' +
            '</div>' +
            '<div class="card-body p-3">' +
            '<ul class="list-group">' +
            '<li class="list-group-item border-0 d-flex align-items-center px-0 mb-2 pt-0">' +
            '<div class="avatar me-3">' +
            '<img src="assets/img/kal-visuals-square.jpg" alt="kal" class="border-radius-lg shadow">' +
            '</div>' +
            '<div class="d-flex align-items-start flex-column justify-content-center">' +
            '<h6 class="mb-0 text-sm">Sophie B.</h6>' +
            '<p class="mb-0 text-xs">Hi! I need more information..</p>' +
            '</div>' +
            '<a class="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto" href="javascript:;">Reply</a>' +
            '</li>' +
            '<li class="list-group-item border-0 d-flex align-items-center px-0 mb-2">' +
            '<div class="avatar me-3">' +
            '<img src="assets/img/marie.jpg" alt="kal" class="border-radius-lg shadow">' +
            '</div>' +
            '<div class="d-flex align-items-start flex-column justify-content-center">' +
            '<h6 class="mb-0 text-sm">Anne Marie</h6>' +
            '<p class="mb-0 text-xs">Awesome work, can you..</p>' +
            '</div>' +
            '<a class="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto" href="javascript:;">Reply</a>' +
            '</li>' +
            '<li class="list-group-item border-0 d-flex align-items-center px-0 mb-2">' +
            '<div class="avatar me-3">' +
            '<img src="assets/img/ivana-square.jpg" alt="kal" class="border-radius-lg shadow">' +
            '</div>' +
            '<div class="d-flex align-items-start flex-column justify-content-center">' +
            '<h6 class="mb-0 text-sm">Ivanna</h6>' +
            '<p class="mb-0 text-xs">About files I can..</p>' +
            '</div>' +
            '<a class="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto" href="javascript:;">Reply</a>' +
            '</li>' +
            '<li class="list-group-item border-0 d-flex align-items-center px-0 mb-2">' +
            '<div class="avatar me-3">' +
            '<img src="assets/img/team-4.jpg" alt="kal" class="border-radius-lg shadow">' +
            '</div>' +
            '<div class="d-flex align-items-start flex-column justify-content-center">' +
            '<h6 class="mb-0 text-sm">Peterson</h6>' +
            '<p class="mb-0 text-xs">Have a great afternoon..</p>' +
            '</div>' +
            '<a class="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto" href="javascript:;">Reply</a>' +
            '</li>' +
            '<li class="list-group-item border-0 d-flex align-items-center px-0">' +
            '<div class="avatar me-3">' +
            '<img src="assets/img/team-3.jpg" alt="kal" class="border-radius-lg shadow">' +
            '</div>' +
            '<div class="d-flex align-items-start flex-column justify-content-center">' +
            '<h6 class="mb-0 text-sm">Nick Daniel</h6>' +
            '<p class="mb-0 text-xs">Hi! I need more information..</p>' +
            '</div>' +
            '<a class="btn btn-link pe-3 ps-0 mb-0 ms-auto w-25 w-md-auto" href="javascript:;">Reply</a>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return html;
    },
    Etiqueta: () => {
        let html = '<div id="etiqueta" class="etiqueta-detalle">' +
            '<div id="agujero-etiqueta" class="row etiqueta-detalle-agujero">' +
            '<button class="btn btn-info btn-etiqueta" onclick="$(\'#etiqueta\').addClass(\'animate__animated animate__fadeOutBottomRight\')">X</button>' +
            '</div>' +
            '<div id="etiqueta-content" style="padding: 15px;margin-top: 25%;">' +
            '</div>' +
            '</div>';
        return html;
    }
};

var Formulario = {
    Modal: (ref, id, filled) => {
        return new Promise((res, rej) => {
            let def;
            $("#modal").remove();
            $("body").append(Template.Modal([
                { class: 'btn btn-info', text: 'Limpiar', fn: '$(\'form\').reset()' },
                { class: 'btn btn-success', text: ((!filled) ? 'Agregar' : 'Actualizar'), fn: 'Functions.setData(\'' + ref + '\', \'' + ((!filled) ? 'Create' : 'Update') + '\', ' + ((!filled) ? 0 : id) + ', $(\'form\').serializeArray()).then(()=>{$(\'#modal\').modal(\'hide\');$(\'[tab=' + ref + ']\').click()})' }
            ]));
            if (filled) {
                $(".modal-title").empty().append("Editar " + ref);
                def = Persistant[ref].find(x => x.id == id);
            } else
                $(".modal-title").empty().append("Agregar " + ref);

            $("#modal").modal("show");
            res(def);
        })
    },
    Cliente: (id, filled) => {
        Formulario.Modal("Cliente", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Cliente', 'Cliente', [
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.nombre : "", label: "nombre*", ref: 'nombre' },
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.apellido_paterno : "", label: "apellido paterno*", ref: 'apellido_paterno' },
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.apellido_materno : "", label: "apellido materno*", ref: 'apellido_materno' },
                { type: 'date', col: 6, disabled: '', def: (filled) ? def.fecha_nacimiento : "", label: "fecha de nacimiento", ref: 'fecha_nacimiento' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.region : "", label: "region", ref: 'region' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.comuna : "", label: "comuna", ref: 'comuna' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.codigo_postal : "", label: "codigo postal", ref: 'codigo_postal' },
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.rut : "", label: "rut", ref: 'rut' },
                { type: 'email', col: 6, disabled: '', def: (filled) ? def.correo : "", label: "correo", ref: 'correo' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.telefono : "", label: "telefono", ref: 'telefono' },
            ]));
            $('select').select2({ dropdownParent: $('#modal') });
        })
    },
    Marca: (id, filled) => {
        Formulario.Modal("Marca", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Marca', 'Marca', [
                { type: 'text', col: 12, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
            ]));
        })
    },
    Estado: (id, filled) => {
        Formulario.Modal("Estado", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Estado', 'Estado', [
                { type: 'text', col: 12, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
            ]));
        })
    },
    Color: (id, filled) => {
        Formulario.Modal("Color", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Color', 'Color', [
                { type: 'text', col: 12, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
            ]));
        })
    },
    Comuna: (id, filled) => {
        Formulario.Modal("Comuna", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Comuna', 'Comuna', [
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.region : "", label: "region", ref: 'region' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.cut : "", label: "cut", ref: 'cut' },
            ]));
        })
    },
    Region: (id, filled) => {
        Formulario.Modal("Region", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Region', 'Region', [
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.abreviacion : "", label: "abreviacion", ref: 'abreviacion' },
            ]));
        })
    },
    Pla: (id, filled) => {
        Formulario.Modal("Pla", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Pla', 'Pla', [
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.color : "", label: "color", ref: 'color' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.marca : "", label: "marca", ref: 'marca' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.diametro : "", label: "diametro", ref: 'diametro' },
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.temperatura : "", label: "temperatura", ref: 'temperatura' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.gramos : "", label: "gramos", ref: 'gramos' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.categoria : "", label: "categoria", ref: 'categoria' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.valor : "", label: "valor", ref: 'valor' },
            ]));
        })
    },
    Categoria: (id, filled) => {
        Formulario.Modal("Categoria", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Categoria', 'Categoria', [
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
            ]));
        })
    },
    Valorizacion: (id, filled) => {
        Formulario.Modal("Valorizacion", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Valorizacion', 'Valorizacion', [
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.material : "", label: "material", ref: 'material' },
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.medida : "", label: "medida", ref: 'medida' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.costo : "", label: "costo", ref: 'costo' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.venta : "", label: "venta", ref: 'venta' },
            ]));
        })
    },
    Solicitud: () => {
        $("#Solicitud > .card > .card-body").empty().append(Template.Formulario('Solicitud', 'Solicitud', [
            { type: 'text', col: 3, disabled: '', label: "nombre*", ref: 'nombre', required: 'required' },
            { type: 'number', col: 3, disabled: '', label: "descuento (Opcional)", ref: 'descuento', fn: 'oninput="Functions.CalcularDetalle()"', required: 'required', min: 0 },
        ]));
    },
    Parte: () => {
        return Template.Formulario('Parte', 'Parte', [
            { type: 'text', col: 3, disabled: '', label: "nombre", ref: 'nombre', fn: 'oninput="Functions.CalcularDetalle()"' },
            { type: 'number', col: 3, disabled: '', label: "cantidad", ref: 'cantidad', fn: 'oninput="Functions.CalcularDetalle()"' },
            { type: 'number', col: 3, disabled: '', label: "minutos", ref: 'minutos', fn: 'oninput="Functions.CalcularDetalle()"' },
            { type: 'select', col: 3, disabled: '', label: "impresora", ref: 'impresora', fn: 'onchange="Functions.CalcularDetalle()"' },
            { type: 'select', col: 3, disabled: '', label: "color", ref: 'color', fn: 'oninput="Functions.CalcularDetalle()"' },
            { type: 'number', col: 3, disabled: '', label: "gramos", ref: 'gramos', fn: 'oninput="Functions.CalcularDetalle()"' },
        ]);
    },
    Impresion: (id, filled) => {
        Formulario.Modal("Impresion", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Impresion', 'Impresion', [
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.cantidad : "", label: "cantidad", ref: 'cantidad' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.color : "", label: "color", ref: 'color' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.gramos : "", label: "gramos", ref: 'gramos' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.minutos : "", label: "minutos", ref: 'minutos' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.impresora : "", label: "impresora", ref: 'impresora' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.estado : "", label: "estado", ref: 'estado' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.descuento : "", label: "descuento", ref: 'descuento' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.costo : "", label: "costo", ref: 'costo' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.costo : "", label: "costo", ref: 'costo' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.subtotal : "", label: "subtotal", ref: 'subtotal' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.total : "", label: "total", ref: 'total' },
            ]));
        })
    },
    Papeleria: (id, filled) => {
        Formulario.Modal("Papeleria", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Papeleria', 'Papeleria', [
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.marca : "", label: "marca", ref: 'marca' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.cantidad : "", label: "cantidad", ref: 'cantidad' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.formato : "", label: "formato", ref: 'formato_papel' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.precio : "", label: "precio", ref: 'precio' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.gramaje : "", label: "gramaje", ref: 'gramaje' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.color : "", label: "color", ref: 'color' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.textura : "", label: "textura", ref: 'textura' },
            ]));
        })
    },
    Formato_Papel: (id, filled) => {
        Formulario.Modal("Formato Papel", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('FormatoPapel', 'FormatoPapel', [
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.medida : "", label: "medida", ref: 'medida' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.medicion : "", label: "medicion", ref: 'medicion' },
            ]));
        })
    },
    Textura: (id, filled) => {
        Formulario.Modal("Textura", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Textura', 'Medicion', [
                { type: 'text', col: 12, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
            ]));
        })
    },
    Medicion: (id, filled) => {
        Formulario.Modal("Medicion", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Medicion', 'Medicion', [
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.abreviacion : "", label: "abreviacion", ref: 'abreviacion' },
            ]));
        })
    },
    Tienda: (id, filled) => {
        Formulario.Modal("Tienda", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Tienda', 'Tienda', [
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.direccion : "", label: "direccion", ref: 'direccion' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.comuna : "", label: "comuna", ref: 'comuna' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.region : "", label: "region", ref: 'region' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.telefono : "", label: "telefono", ref: 'telefono' },
                { type: 'email', col: 6, disabled: '', def: (filled) ? def.correo : "", label: "correo", ref: 'correo' },
            ]));
        })
    },
    Impresora: (id, filled) => {
        Formulario.Modal("Impresora", id, filled).then((def) => {
            $(".modal-body").empty().append(Template.Formulario('Impresora', 'Impresora', [
                { type: 'text', col: 6, disabled: '', def: (filled) ? def.nombre : "", label: "nombre", ref: 'nombre' },
                { type: 'number', col: 6, disabled: '', def: (filled) ? def.kwh : "", label: "kwh", ref: 'kwh' },
                { type: 'select', col: 6, disabled: '', def: (filled) ? def.marca : "", label: "marca", ref: 'marca' },
            ]));
        })
    }
}

var Functions = {
    SelectTab: obj => {
        $(".tab-panel").removeClass("tab-panel-active")
        $("#" + obj.attributes.tab.value).addClass("tab-panel-active")
    },
    ChargeData: (funcion, accion, persistant = false) => {
        let datos = $.ajax({
            url: "connection/model.php",
            dataType: "script",
            type: 'POST',
            data: { Funcion: funcion, Accion: accion },
            success: function (data) { },
            async: false,
            error: function (err) {
                console.log(err);
            }
        }).responseText;
        (persistant) ? Persistant[funcion.toString()] = JSON.parse(datos) : "";
        return JSON.parse(datos);
    },
    setData: (funcion, accion, id = 0, obj = [{}]) => {
        return new Promise((res, rej) => {
            $.post("connection/model.php", { Funcion: funcion, Accion: accion, Obj: obj, Id: id })
                .done((data) => {
                    let datos = JSON.parse(data);
                    Template.Toast('success', datos.status);
                    res(datos);
                })
                .fail((data) => {
                    let datos = JSON.parse(data);
                    Template.Toast('success', datos.status);
                    rej(datos);
                });
        })
    },
    addParte: () => {
        let version = Persistant.Incremental++;
        $("#Solicitud").append(Template.CardTable('Parte' + version, false, 12, true, 'Parte', false, false, true, 'margin-top:50px'));
        $("#Parte" + version + " > .card > .card-body").append(Formulario.Parte());
    },
    CalcularHoras: (valor) => {
        Persistant.Horas = parseInt(valor) / 60;
        // $("#Horas").empty().html(Functions.FloatToTime(Persistant.Horas));
    },
    CalcularUso: (valor) => {
        Persistant.KW = (valor * Persistant.Horas).toFixed(2);
        // $("#KW").empty().html(Persistant.KW);
    },
    CalcularDetalle: () => {
        let Calc = Persistant.Detalle = { Costo: 0, Subtotal: 0, Horas: 0, Kw: 0, Descuento: 0, Total: 0, Ganancia: 0, Cantidad: 0 };
        let Part = Persistant.Partes = [];
        Calc.Descuento = $('#descuento').val();
        $("form").each(function (i, e) {
            if (i != 0) {
                let parte = {};
                parte.nombre = $(this).find("#nombre").val();
                parte.cantidad = $(this).find("#cantidad").val();
                parte.minutos = $(this).find("#minutos").val();
                parte.impresora = $(this).find("#impresora option:selected").val();
                parte.color = $(this).find("#color option:selected").val();
                parte.gramos = $(this).find("#gramos").val();

                Part.push(parte);

                Calc.Cantidad = ($(this).find("#cantidad").val() != undefined) ? $(this).find("#cantidad").val() : 0;
                Functions.CalcularHoras($(this).find("#minutos").val() * Calc.Cantidad);
                Functions.CalcularUso(($(this).find("#impresora option:selected").attr('kwh') != undefined) ? $(this).find("#impresora option:selected").attr('kwh') : 0);

                Calc.Horas += Persistant.Horas;
                Calc.Kw += parseFloat(Persistant.KW);
                Calc.Costo += Math.round(((Persistant.Valorizacion[0].costo * $(this).find("#gramos").val()) * Calc.Cantidad) + (Persistant.Valorizacion[1].costo * Persistant.KW) + (Persistant.Valorizacion[2].costo * Persistant.Horas));
                Calc.Subtotal += Math.round(((Persistant.Valorizacion[0].venta * $(this).find("#gramos").val()) * Calc.Cantidad) + (Persistant.Valorizacion[1].venta * Persistant.KW) + (Persistant.Valorizacion[2].venta * Persistant.Horas));
            }
        });

        Calc.Total = Calc.Subtotal - Calc.Descuento;
        Calc.Ganancia = ((Calc.Subtotal - Calc.Descuento) - Calc.Costo);

        $("#Horas").empty().html(Functions.FloatToTime(Calc.Horas));
        $("#KW").empty().html(Calc.Kw);
        $("#Costo").html(Calc.Costo);
        $("#Subtotal").html(Calc.Subtotal);
        $("#Descuento").html(Calc.Descuento + '(' + ((Calc.Descuento * 100) / Calc.Subtotal).toFixed(1) + '%)');
        $("#Total\\ a\\ Pagar").html(Calc.Total);
        $("#Ganancia").html(Calc.Ganancia);
    },
    PrepararSolicitud3D: () => {
        let impresion = [
            { name: 'modelo', value: $("form#Solicitud").find("#nombre").val() },
            { name: 'costo', value: Persistant.Detalle.Costo },
            { name: 'subtotal', value: Persistant.Detalle.Subtotal },
            { name: 'descuento', value: Persistant.Detalle.Descuento },
            { name: 'total', value: Persistant.Detalle.Total },
            { name: 'cliente', value: $("[name='Cliente']:checked").val() },
        ]
        if (Functions.ValidateForm("form")) return;
        Functions.setData('Impresion', 'Create', 0, impresion).then((imp) => {
            $("form[ref='Parte']").each(function (i, e) {
                let parte = $(this).serializeArray();
                parte = parte.concat({ name: 'impresion', value: imp.returning });
                Functions.setData('Parte', 'Create', 0, parte);
            })
                (Persistant.Partes).forEach(e => {

                });
            $("form").trigger("reset");
            $("form").parent().parent().parent("[id*='Parte']").empty();
            $("#Horas, #KW, #Costo, #Subtotal, #Descuento, #Total\\ a\\ Pagar, #Ganancia").html(0)
        })
    },
    FloatToTime: number => {
        var sign = (number >= 0) ? 1 : -1;
        number = number * sign;
        var hour = Math.floor(number);
        var decpart = number - hour;

        var min = 1 / 60;
        decpart = min * Math.round(decpart / min);
        var minute = Math.floor(decpart * 60) + '';

        if (minute.length < 2) {
            minute = '0' + minute;
        }

        sign = sign == 1 ? '' : '-';
        time = sign + hour + ':' + minute;

        return (!time.includes('NaN')) ? time : 0;
    },
    ValidateForm: form => {
        let datos = $(form).serializeArray();
        let Er = Persistant.Error = {};
        Er.Count = 0;
        Er.Lista = '<h5>Campos faltantes</h5>' +
            '<ul>';
        $(form + ' :input').each((i, e) => {
            if (e.value == "" || e.value == undefined || e.value == null || e.value == -1) {
                Er.Lista += '<li>' + e.name + '</li>';
                Er.Count++;
                $(e).addClass("voidfocus animate__animated animate__bounce animate__repeat-3");
                setTimeout(() => { $(e).removeClass("voidfocus animate__animated animate__bounce animate__repeat-3") }, 3000);
            }
        });
        Er.Lista += "</ul>";
        Template.Toast('error', Er.Lista)
        return (Er.Count == 0) ? false : true
    },
    Graphics: () => {
        var ctx = document.getElementById("chart-bars").getContext("2d");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["M", "T", "W", "T", "F", "S", "S"],
                datasets: [{
                    label: "Sales",
                    tension: 0.4,
                    borderWidth: 0,
                    borderRadius: 4,
                    borderSkipped: false,
                    backgroundColor: "rgba(255, 255, 255, .8)",
                    data: [50, 20, 10, 22, 50, 10, 40],
                    maxBarThickness: 6
                },],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5],
                            color: 'rgba(255, 255, 255, .2)'
                        },
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 500,
                            beginAtZero: true,
                            padding: 10,
                            font: {
                                size: 14,
                                weight: 300,
                                family: "Roboto",
                                style: 'normal',
                                lineHeight: 2
                            },
                            color: "#fff"
                        },
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5],
                            color: 'rgba(255, 255, 255, .2)'
                        },
                        ticks: {
                            display: true,
                            color: '#f8f9fa',
                            padding: 10,
                            font: {
                                size: 14,
                                weight: 300,
                                family: "Roboto",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                },
            },
        });


        var ctx2 = document.getElementById("chart-line").getContext("2d");

        new Chart(ctx2, {
            type: "line",
            data: {
                labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Mobile apps",
                    tension: 0,
                    borderWidth: 0,
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(255, 255, 255, .8)",
                    pointBorderColor: "transparent",
                    borderColor: "rgba(255, 255, 255, .8)",
                    borderColor: "rgba(255, 255, 255, .8)",
                    borderWidth: 4,
                    backgroundColor: "transparent",
                    fill: true,
                    data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
                    maxBarThickness: 6

                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5],
                            color: 'rgba(255, 255, 255, .2)'
                        },
                        ticks: {
                            display: true,
                            color: '#f8f9fa',
                            padding: 10,
                            font: {
                                size: 14,
                                weight: 300,
                                family: "Roboto",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            color: '#f8f9fa',
                            padding: 10,
                            font: {
                                size: 14,
                                weight: 300,
                                family: "Roboto",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                },
            },
        });

        var ctx3 = document.getElementById("chart-line-tasks").getContext("2d");

        new Chart(ctx3, {
            type: "line",
            data: {
                labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [{
                    label: "Mobile apps",
                    tension: 0,
                    borderWidth: 0,
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(255, 255, 255, .8)",
                    pointBorderColor: "transparent",
                    borderColor: "rgba(255, 255, 255, .8)",
                    borderWidth: 4,
                    backgroundColor: "transparent",
                    fill: true,
                    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                    maxBarThickness: 6

                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    y: {
                        grid: {
                            drawBorder: false,
                            display: true,
                            drawOnChartArea: true,
                            drawTicks: false,
                            borderDash: [5, 5],
                            color: 'rgba(255, 255, 255, .2)'
                        },
                        ticks: {
                            display: true,
                            padding: 10,
                            color: '#f8f9fa',
                            font: {
                                size: 14,
                                weight: 300,
                                family: "Roboto",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false,
                            display: false,
                            drawOnChartArea: false,
                            drawTicks: false,
                            borderDash: [5, 5]
                        },
                        ticks: {
                            display: true,
                            color: '#f8f9fa',
                            padding: 10,
                            font: {
                                size: 14,
                                weight: 300,
                                family: "Roboto",
                                style: 'normal',
                                lineHeight: 2
                            },
                        }
                    },
                },
            },
        });
    },
    TabsInit: () => {
        var tabss = $('.tabs');
        var selector = $('.tabs').find('a').length;
        var activeItem = tabss.find('.active');
        var activeWidth = activeItem.innerWidth();
        $(".selector").css({
            "left": activeItem.position.left + "px",
            "width": activeWidth + 13 + "px"
        });

        $(".tabs").on("click", "a", function (e) {
            e.preventDefault();
            $('.tabs a').removeClass("active");
            $(this).addClass('active');
            var activeWidth = $(this).innerWidth();
            var itemPos = $(this).position();
            $(".selector").css({
                "left": itemPos.left + "px",
                "width": activeWidth + "px"
            });
        });
    },
    MenuSelection: (page, color, animation) => {
        $("a[page]").removeClass("active " + color);
        $("a[page=" + page + "]").addClass("active " + color + ' ' + animation);
        setTimeout(() => { $("a[page=" + page + "]").removeClass(animation) }, 1000);
    },
    Transition: (target, empty = false, animateOut = 'animate__fadeOut', animateIn = 'animate__fadeInRight', durationOut = '0.25s', durationIN = '0.5s', velocity = 'animate__fast') => {
        return new Promise((res, rej) => {
            $(target).addClass('animate__animated ' + animateOut + ' ' + velocity).css({ '--animate-duration': durationOut });
            setTimeout(() => {
                $(target).removeClass("animate__animated " + animateOut).css({ '--animate-duration': durationIN });
                (empty != false) ? $(empty).empty() : '';
                $(target).removeClass('animate__animated ' + animateOut).addClass("animate__animated " + animateIn);
                res(true);
            }, 390);
        })
    },
    TooltipInit: () => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    },
    ContextMenu: () => {
        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        }, false);
    },
    DisableVS: () => {
        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey || e.keyCode == 123) {
                e.stopPropagation();
                e.preventDefault();
            }
        });
    },
    CerrarSession: () => {
        Cookies.remove('user', { path: '/' });
        window.location.href = 'index.php';
    }
}

var Fix = {
    RenderFocus: () => {
        var inputs = document.querySelectorAll('input');

        for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('focus', function (e) {
                this.parentElement.classList.add('is-focused');
            }, false);

            inputs[i].onkeyup = function (e) {
                if (this.value != "") {
                    this.parentElement.classList.add('is-filled');
                } else {
                    this.parentElement.classList.remove('is-filled');
                }
            };

            inputs[i].addEventListener('focusout', function (e) {
                if (this.value != "") {
                    this.parentElement.classList.add('is-filled');
                }
                this.parentElement.classList.remove('is-focused');
            }, false);
        }
    },
    Override: () => {
        var Override = Object.key;
        Override = function (str) {
            console.log("Funcion Desactivada. Atte: VOrtega");
            return true;
        }
    }
}

// Functions.ContextMenu();
// Functions.DisableVS();
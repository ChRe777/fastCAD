<!--nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/settings">Settings</a>
</nav-->

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="/"><i class="bi bi-house"></i> Home</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/About"
                        ><i class="bi bi-info-circle"></i> About</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/Settings"
                        ><i class="bi bi-gear"></i> Setting</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/Pricing"
                        ><i class="bi bi-tag"></i> Pricing</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/Blog/Hello"
                        ><i class="bi bi-bootstrap"></i> Blog</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/API/random-number"
                        ><i class="bi bi-wrench-adjustable"></i> API</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true" href="/"
                        >Disabled</a
                    >
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="container w-75 p-3">
    <center>
        <slot />
    </center>
</div>

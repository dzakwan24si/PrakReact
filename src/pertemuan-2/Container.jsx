export default function Container({children}){
    return(
        <div>
            <h1>Pemrograman Framework Lanjutan</h1>
            <img src="img/image.png" alt="Gambar 1" width="100%"/>
            <br/>
                {children}
            <br/>
            <footer>
                <p>2025 - Politeknik Caltex Riau</p>
            </footer>
        </div>
    )
}
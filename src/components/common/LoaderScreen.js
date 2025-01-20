import loder from '../../assets/Logo/LoaderGif.gif'

const LoadindScreen = ()=>{
    return(
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-white/70 z-50">
            <div className='flex items-center justify-center h-full'>
                <img src={loder}/>
            </div>
        </div>
    )
}
export default LoadindScreen;
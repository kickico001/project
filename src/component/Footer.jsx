
const Footer = () => {
    return (
        <section className="bg-[#3BAA671A]">
            <div className="max-w-screen-xl mx-auto lg:px-10 px-4 py-8 pt-32">
                <img src="" className="ml-4 lg:ml-0" alt="" />
                <div className="flex justify-center gap-4 md:gap-6 text-center  font-semibold pt-16 pb-12">
                    <a className="link link-hover pt-1 block">About Us</a>
                    <a className="link link-hover pt-1 block">Services</a>
                    <a className="link link-hover pt-1 block">Contact Us</a>
                    <a className="link link-hover pt-1 block">FAQ</a>
                    <a className="link link-hover pt-1 block">Blog</a>
                </div>

                <div className="sm:flex space-x-4 gap-6 text-center border-[#D9D9D9] border-t pt-4">
                    <p>2023 CardaFlux. All rights reserved.</p>
                    <a className="underline">Privacy Policy</a>
                    <a className="underline">Terms and Conditions</a>
                </div>
            </div>
        </section>


    )
}

export default Footer
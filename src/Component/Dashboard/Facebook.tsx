import React from 'react'

export default function Facebook() {
    return (
        <div className="w-full relative items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
            <div className="rounded-t mb-4 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            Virtuos Facebook
                        </h2>

                    </div>
                </div>
            </div>
            <iframe
                name="f3c10e21a06d478"
                data-testid="fb:page Facebook Social Plugin"
                title="fb:page Facebook Social Plugin"
                frameBorder={0}
                allowTransparency={true}
                allowFullScreen={true}
                scrolling="no"
                allow="encrypted-media"
                src="https://www.facebook.com/v2.5/plugins/page.php?adapt_container_width=true&app_id=335742193216977&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df2deab0f4ba7b9%26domain%3Dmyvirtuos.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fmyvirtuos.com%252Ffb4ea6b1bc5df%26relation%3Dparent.parent&container_width=615&height=350&hide_cover=false&href=https%3A%2F%2Fwww.facebook.com%2Fvirtuos%2F&locale=en_US&sdk=joey&show_facepile=true&small_header=true&tabs=timeline%2C%20events%2Cmessages&width=460"
                style={{ border: "none", visibility: "visible", width: "100%", height: "39rem" }}
                className=""
            />
        </div>
    )
}

import { getHeroVideoSrc } from "@/helpers/get-hero-video-src";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { Button } from "./button";
import { VideoPreview } from "./video-preview";

gsap.registerPlugin(ScrollTrigger);

const videoFrameId = "video-frame";
const nextVideoId = "next-video";
const currentVideoId = "current-video";

export const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [hasClicked, setHasClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [loadedVideos, setLoadedVideos] = useState(0);
	const totalVideos = 4;
	const nextVideoRef = useRef<HTMLVideoElement>(null);

	const handleVideoLoad = () => setLoadedVideos((prev) => prev + 1);

	const handleMiniVdClick = () => {
		setHasClicked(true);
		setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
	};

	useEffect(() => {
		if (loadedVideos === totalVideos - 1) {
			setIsLoading(false);
		}
	}, [loadedVideos]);

	useGSAP(
		() => {
			if (hasClicked) {
				gsap.set(`#${nextVideoId}`, { visibility: "visible" });
				gsap.to(`#${nextVideoId}`, {
					transformOrigin: "center center",
					scale: 1,
					width: "100%",
					height: "100%",
					duration: 1,
					ease: "power1.inOut",
					//@ts-expect-error
					onStart: () => nextVideoRef.current?.play(),
				});
				gsap.from(`#${currentVideoId}`, {
					transformOrigin: "center center",
					scale: 0,
					duration: 1.5,
					ease: "power1.inOut",
				});
			}
		},
		{
			dependencies: [currentIndex],
			revertOnUpdate: true,
		},
	);

	useGSAP(() => {
		gsap.set(`#${videoFrameId}`, {
			clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
			borderRadius: "0% 0% 40% 10%",
		});
		gsap.from(`#${videoFrameId}`, {
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			borderRadius: "0% 0% 0% 0%",
			ease: "power1.inOut",
			scrollTrigger: {
				trigger: `#${videoFrameId}`,
				start: "center center",
				end: "bottom center",
				scrub: true,
			},
		});
	});

	return (
		<div className="relative h-dvh w-screen overflow-x-hidden">
			{isLoading && (
				<div className="flex-center absolute z-60 h-dvh w-screen overflow-hidden bg-violet-50">
					<div className="three-body">
						<div className="three-body__dot" />
						<div className="three-body__dot" />
						<div className="three-body__dot" />
					</div>
				</div>
			)}
			<div
				id={videoFrameId}
				className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
			>
				<div>
					<div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
						<VideoPreview>
							<div
								onClick={handleMiniVdClick}
								className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
							>
								<video
									ref={nextVideoRef}
									src={getHeroVideoSrc((currentIndex % totalVideos) + 1)}
									loop
									muted
									id={currentVideoId}
									className="size-64 origin-center scale-150 object-cover object-center"
									onLoadedData={handleVideoLoad}
								/>
							</div>
						</VideoPreview>
					</div>
					<video
						ref={nextVideoRef}
						src={getHeroVideoSrc(currentIndex)}
						loop
						muted
						id={nextVideoId}
						className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
						onLoadedData={handleVideoLoad}
					/>
					<video
						src={getHeroVideoSrc(
							currentIndex === totalVideos - 1 ? 1 : currentIndex,
						)}
						autoPlay
						loop
						muted
						className="absolute left-0 top-0 size-full object-cover object-center"
						onLoadedData={handleVideoLoad}
					/>
				</div>
				<h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
					G<b>A</b>MING
				</h1>
				<div className="absolute left-0 top-0 z-40 size-full">
					<div className="mt-24 px-5 sm:px-10">
						<h1 className="special-font hero-heading text-blue-100">
							redefi<b>n</b>e
						</h1>
						<p className="mb-5 max-w-64 font-robert-regular text-blue-100">
							Enter the Metagame Layer <br /> Unleash the Play Economy
						</p>
						<Button
							title="Watch trailer"
							leftIcon={<TiLocationArrow />}
							onClick={()=> window.open("https://www.youtube.com/watch?v=x1_-btXPWpc", "_blank", "noreferrer")}
							className="bg-yellow-300 flex-center gap-1"
						/>
					</div>
				</div>
			</div>
			<h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
				G<b>A</b>MING
			</h1>
		</div>
	);
};

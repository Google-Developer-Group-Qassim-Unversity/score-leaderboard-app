import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Infinity } from "lucide-react";

export default function DashboardHonorDept() {
	return (
		<div className="mt-8">
			<Card className="bg-gradient-to-br from-cyan-50 via-white to-blue-50 rounded-2xl shadow-xl border-2 border-cyan-200 hover:shadow-2xl transition-all duration-300 overflow-hidden">
				<div className="relative">
					{/* Code-like background effect */}
					<div className="absolute inset-0 opacity-20">
						<div className="absolute top-4 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
						<div className="absolute top-12 right-12 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500"></div>
						<div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse delay-1000"></div>
						<div className="absolute bottom-16 right-8 w-1 h-1 bg-indigo-400 rounded-full animate-pulse delay-700"></div>
					</div>
					<CardHeader className="pb-6 relative z-10">
						<div className="flex items-center justify-center">
							<div>
								<CardTitle className="text-2xl font-bold text-center text-slate-900 flex items-center justify-center gap-3">
									<div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
										<Infinity className="h-6 w-6 text-white" />
									</div>
									Honor Department
								</CardTitle>
							</div>
						</div>
					</CardHeader>
					<CardContent className="relative z-10">
						<div className="group flex items-center justify-between p-8 rounded-2xl bg-gradient-to-r from-cyan-100/50 via-white to-blue-100/50 border-2 border-cyan-200 shadow-lg hover:shadow-xl transition-all duration-300">
							<div className="flex items-center gap-6">
								<div className="relative">
									<Badge
										variant="secondary"
										className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 border-2 border-cyan-300 shadow-lg group-hover:shadow-xl transition-all duration-300"
									>
										<Infinity className="h-7 w-7" />
									</Badge>
								</div>
								<div className="flex-1">
									<p className="font-bold text-slate-900 sm:text-2xl group-hover:text-cyan-800 transition-colors duration-200">
										Software Development
									</p>
									<div className="flex items-center gap-2 mt-2">
										<div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-pulse"></div>
										<p className="text-sm text-cyan-600 font-semibold">Department</p>
									</div>
									<p className="text-xs text-slate-500 mt-1 italic">
										GDG dev team
									</p>
								</div>
							</div>
							<div className="text-right">
								<div className="flex items-center justify-end gap-2 mb-2">
									<p className="font-bold text-5xl bg-gradient-to-r from-cyan-600 to-blue-800 bg-clip-text text-transparent">
										∞
									</p>
								</div>
								<p className="text-xs text-cyan-400 uppercase tracking-wider font-bold">Team Score</p>
							</div>
						</div>
					</CardContent>
				</div>
			</Card>
		</div>
	);
}

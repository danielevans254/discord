const AuthLayout = ({
  children
}: {
  children: React.ReactNode

}) => {
  return <div className="flex items-center justify-center pb-40 bg-slate-300 h-full">{children}</div>
}

export default AuthLayout;
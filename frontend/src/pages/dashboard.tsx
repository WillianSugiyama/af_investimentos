import { useAuth } from "../context/auth-context";
import useSWR from 'swr';
import api from "../services/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Dashboard() {
  const { user, loading, isAuthenticated }: any = useAuth();
  const route = useRouter();

  useEffect(() => {
    console.log(isAuthenticated, user)
    if (!loading && !isAuthenticated) {
      route.push('/');
    }

    console.log(isAuthenticated, user)

  }, [isAuthenticated])


  return (
    <>
      <div>Authenticated</div>
    </>
  )
}

export default Dashboard;
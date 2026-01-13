import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import useUsersStore from "@/common/stores/usersStore";

const stats = [
  { title: "Total Users", value: "1,245", progress: 70 },
  { title: "Active Sessions", value: "342", progress: 45 },
  { title: "Revenue", value: "$12,430", progress: 85 },
];

const Home = () => {

  const {users, fetchUsers} = useUsersStore()

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              <Progress value={stat.progress} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;


import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

// The Indian Army has established multiple military camps at strategic locations 
// along the Line of Actual Control (LAC) in Galwan. These camps are connected in 
// a hierarchical structure, with a main base camp acting as the root of the network.

// To fortify national security, the Government of India has planned to deploy 
// a protective S.H.I.E.L.D. that encloses all military camps forming the outer 
// boundary of the network.

// Structure of Military Camps:
//     - Each military camp is uniquely identified by an integer ID.
//     - A camp can have at most two direct connections:
//         - Left connection → Represents a subordinate camp on the left.
//         - Right connection → Represents a subordinate camp on the right.
//     - If a military camp does not exist at a specific position, it is 
//       represented by -1
	
// Mission: Deploying the S.H.I.E.L.D.
// Your task is to determine the list of military camp IDs forming the outer 
// boundary of the military network. This boundary must be traversed in 
// anti-clockwise order, starting from the main base camp (root).

// The boundary consists of:
// 1. The main base camp (root).
// 2. The left boundary:
//     - Starts from the root’s left child and follows the leftmost path downwards.
//     - If a camp has a left connection, follow it.
//     - If no left connection exists but a right connection does, follow the right connection.
//     - The leftmost leaf camp is NOT included in this boundary.
// 3. The leaf camps (i.e., camps with no further connections), ordered from left to right.
// 4. The right boundary (in reverse order):
//     - Starts from the root’s right child and follows the rightmost path downwards.
//     - If a camp has a right connection, follow it.
//     - If no right connection exists but a left connection does, follow the left connection.
//     - The rightmost leaf camp is NOT included in this boundary.


// Input Format:
// -------------
// space separated integers, military-camp IDs.

// Output Format:
// --------------
// Print all the military-camp IDs, which are at the edge of S.H.I.E.L.D.


// Sample Input-1:
// ---------------
// 5 2 4 7 9 8 1

// Sample Output-1:
// ----------------
// [5, 2, 7, 9, 8, 1, 4]


// Sample Input-2:
// ---------------
// 11 2 13 4 25 6 -1 -1 -1 7 18 9 10

// Sample Output-2:
// ----------------
// [11, 2, 4, 7, 18, 9, 10, 6, 13]


// Sample Input-3:
// ---------------
// 1 2 3 -1 -1 -1 5 -1 6 7

// Sample Output-3:
// ----------------
// [1, 2, 7, 6, 5, 3]
class Node{
    int data;
    Node left,right;
    Node(int d){
        data=d;
        left=null;
        right=null;
    }
}
public class BoundaryOfBinaryTree {
    public static Node insert(int a[]){
        int n=a.length;
        Node root=new Node(a[0]);
        int i=1;
        Queue<Node> q=new LinkedList<>();
        q.add(root);
        while(!q.isEmpty() && i<n){
            Node t=q.poll();
            if(a[i]!=-1){
                t.left=new Node(a[i]);
                
                q.add(t.left);
            }
            i++;
            if(i<n && a[i]!=-1){
                t.right=new Node(a[i]);
                q.add(t.right);
            }
            i++;
        }
        return root;
    }
    public static void boundary(Node root){
        if(root==null) return;
        ArrayList<Integer> a=new ArrayList<>();
        a.add(root.data);
        left(root.left,a);
        leaves(root.left,a);
        leaves(root.right,a);
        right(root.right,a);
        System.out.println(a);
    }
    public static void left(Node root,ArrayList<Integer> a)
    {
        if(root==null || (root.left==null && root.right==null)) return;
        a.add(root.data);
        if(root.left!=null) left(root.left,a);
        else left(root.right,a); 
    }
    public static void right(Node root,ArrayList<Integer> a)
    {
        if(root==null || (root.left==null && root.right==null)) return;
        
        if(root.right!=null) right(root.right,a);
        else right(root.left,a); 
        a.add(root.data);
    }
    public static void leaves(Node root,ArrayList<Integer> a){
        if(root==null) return;
        if(root.left==null && root.right==null) a.add(root.data);
        leaves(root.left,a);
        leaves(root.right,a);
    }
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        String[] s=sc.nextLine().split(" ");
        int n=s.length;
        int a[]=new int[n];
        for(int i=0;i<n;i++){ 
            a[i]=Integer.parseInt(s[i]);
        }
        Node root=insert(a);
        
        boundary(root);
    }
}

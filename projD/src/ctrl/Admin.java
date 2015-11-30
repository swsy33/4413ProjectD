package ctrl;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import analytics.MaxPrinciple;

/**
 * Servlet implementation class Admin
 */
@WebServlet(urlPatterns="/Admin")
public class Admin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Admin() {
        super();
    }
    
    public void init() throws ServletException 
	{
		super.init();
		//MaxPrinciple mp = new MaxPrinciple();
		//this.getServletContext().setAttribute("listener",mp);
		
	}
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String urlPath = request.getScheme()+ "://" + request.getServerName() + ":"
				+ request.getServerPort() + request.getServletContext().getContextPath();
		request.setAttribute("urlPath",urlPath);
		HttpSession hs = request.getSession();
		String sessionMP = (String)hs.getAttribute("sessionMaxPrinciple");
		request.setAttribute("maxPrinciple", sessionMP);
		this.getServletContext().getRequestDispatcher("/MaxP.jspx").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
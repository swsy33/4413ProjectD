package ctrl;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import model.JsonBean;
import model.Mortgage;

/**
 * Servlet implementation class Service
 */
@WebServlet({ "/Service", "*.do" })
public class Service extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Service() {
        super();
    }
    public void init() throws ServletException 
	{
		super.init();
		try
		{
			Mortgage model = new Mortgage();
			this.getServletContext().setAttribute("model",model);		
		}
		catch(Exception e)
		{
			System.out.println("here");
			e.printStackTrace();
			//throw new ServletException("Init exception........");
		}

	}
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Mortgage m = (Mortgage)this.getServletContext().getAttribute("model");
		//---------------------------------------------------------
		/*String principle = request.getParameter("principle");
		String interest =request.getParameter("interest"); 
		String amort = request.getParameter("amort");
		String bank = request.getParameter("bank");
		String payment = m.servePayment(principle, amort,interest);*/
		
		String data = request.getParameter("args");
		//System.out.println("data" + data);
		Gson gson = new Gson();
		JsonBean jb = gson.fromJson(data, JsonBean.class);
		String principle = jb.getPrinciple();
		String interest =jb.getInterest();
		String amort = jb.getAmort();
		System.out.println("p i a " + principle + interest + amort);
		String payment = m.servePayment(principle, amort,interest);
		System.out.println("payment  " + payment);
		
		response.setHeader("Content-Type", "text/plain");
		
		//response.getWriter().println(payment);
		request.getRequestDispatcher("index.html").forward(request, response);

		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
	}

}
